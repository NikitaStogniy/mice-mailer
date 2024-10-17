import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { Database } from '../model/supabaseTypes';
import { createClient } from '@supabase/supabase-js';
import { HandlebarsService } from './handlebars.service';
import { PdfService } from './pdf.service';
import { formatDate } from '../utils/formatDate';
import {
  IFood,
  IHall,
  IHotel,
  IRequest,
  IResult,
  IRoom,
  User,
} from '../model/appTypes';

const supabase = createClient<Database>(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY,
);

@Injectable()
export class AppService {
  constructor(
    private readonly mailerService: MailerService,
    private readonly handlebarsService: HandlebarsService,
    private readonly pdfService: PdfService,
  ) {}

  public getHello(): string {
    return 'Hello World!';
  }

  public async sendEmail(body: { id: string }): Promise<void> {
    const result = await this.getResult({ id: body.id });

    if (!result) {
      throw new Error(`No requests for id: ${body.id}`);
    }

    await this.sendEmailsToHotelOwners(result);
    await this.sendEmailsToClient(result);
  }

  private async getResult(body: { id: string }): Promise<IResult> {
    const requestWrappers = await this.getRequestWrappers(body.id);

    const results: IResult[] = [];
    for (let requestWrapper of requestWrappers) {
      const result = await this.getResultForRequestWrapper(requestWrapper);
      results.push(result);
    }

    if (results.length > 0) {
      return results[0];
    }
    return null;
  }

  private async getRequestWrappers(id: string) {
    const { data, error } = await supabase
      .from('request_wrapper')
      .select('*')
      .eq('id', id);

    if (error) {
      console.log(error);
      throw 'Error fetching data';
    }
    return data;
  }

  private async getResultForRequestWrapper(requestWrapper) {
    const owner = await this.getUserById(requestWrapper.owner);
    const juridicalInfo = await this.getJuridicalInfo(requestWrapper.owner);

    const requests = await Promise.all(
      (requestWrapper.requests_id || []).map((requestId) =>
        this.getRequestForRequestId(requestId),
      ),
    );

    return <IResult>{
      name: requestWrapper.name || '',
      requests,
      owner,
      juridicalInfo,
    };
  }

  private async getRequestById(id: number) {
    const { data, error } = await supabase
      .from('requests')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.log('getRequestById', id, error);
    }
    return data;
  }

  private async getJuridicalInfo(ownerId: number) {
    const { data, error } = await supabase
      .from('juridical_info')
      .select('*')
      .eq('owner', ownerId)
      .single();

    if (error) {
      console.log('getJuridicalInfo', ownerId, error);
    }

    return data;
  }

  private async getUserById(id: number) {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.log('getUserById', id, error);
    }
    return data;
  }

  private async getUserByUid(uids: string[]) {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('uid', uids)
      .single();

    if (error) {
      console.log('getUserById', uids, error);
    }
    return data;
  }

  private async getRequestForRequestId(requestId: number) {
    const request = await this.getRequestById(requestId);
    const hotel = await this.getHotel(request.hotel);
    const rooms = await this.getRooms(request.rooms);
    const food = await this.getFood(request.food);
    const halls = await this.getHalls(request.halls);

    return <IRequest>{
      id: request.id || 0,
      createdAt: request.created_at,
      count: request.people_count || 0,
      date: request.day_start || '',
      duration: request.duration || 0,
      name: request.name || '',
      rooms,
      halls,
      food,
      hotel,
      roomsTotalCost: request.room_price,
      foodTotalCost: request.food_price,
      hallsTotalCost: request.hall_price,
      totalCost: request.price || 0,
    };
  }

  private async getHotel(hotelId: number) {
    const { data: hotel, error } = await supabase
      .from('hotel')
      .select('*')
      .eq('id', hotelId)
      .single();

    if (error) {
      console.log('getHotel', hotelId, error);
    }

    const owner = await this.getUserByUid(hotel.owner_id);
    const juridicalInfo = await this.getJuridicalInfo(owner.id);

    return <IHotel>{
      name: hotel.name || '',
      address: hotel.address || '',
      email: owner.email || '',
      phone: owner.phone || '',
      owner,
      juridicalInfo,
    };
  }

  private async getRooms(roomIds: number[]) {
    const rooms: IRoom[] = [];
    for (const roomId of roomIds) {
      const { data, error } = await supabase
        .from('requests_room_var')
        .select('*')
        .eq('id', roomId)
        .single();

      if (error) {
        console.log('getRooms', roomId, error);
        continue;
      }

      rooms.push({
        type: data.room_name || '',
        name: data.room_name || '',
        quantity: data.room_count || 0,
        nights: data.room_count || 0,
        cost: data.price || 0,
      });
    }
    return rooms;
  }

  private async getFood(foodIds: number[]) {
    const food: IFood[] = [];
    for (const foodId of foodIds) {
      const { data, error } = await supabase
        .from('requests_food_var')
        .select('*')
        .eq('id', foodId)
        .single();

      if (error) {
        console.log('getFood', foodId, error);
        continue;
      }

      food.push({
        packageName: data.name || '',
        quantity: data.count || 0,
        persons: data.persons_count || 0,
        cost: data.price,
      });
    }
    return food;
  }

  private async getHalls(hallIds: number[]) {
    const halls: IHall[] = [];
    for (const hallId of hallIds) {
      const { data, error } = await supabase
        .from('requests_hall_var')
        .select('*')
        .eq('id', hallId)
        .single();

      if (error) {
        console.log('getHalls', hallId, error);
        continue;
      }

      halls.push({
        name: data.hall_name || '',
        cost: data.price || 0,
        seating: data.seating || '',
        days: data.days || 0,
      });
    }
    return halls;
  }

  private async sendEmailsToClient(result: IResult) {
    for(const request of result.requests) {
      await this.sendEmailToClient(request, result.owner);
    }
  }

  private async sendEmailToClient(request: IRequest, owner: User) {
    const clientTemplateContext = {
      request,
    };
    const clientHtmlForPdf = await this.handlebarsService.renderTemplate(
      'client',
      clientTemplateContext,
    );
    const clientPdfFileBuffer = Buffer.from(
      await this.pdfService.generatePdf(clientHtmlForPdf),
    );

    const clientPdfSubject = `Ваш запрос в отель ${clientTemplateContext.request.hotel.name} от ${formatDate(clientTemplateContext.request.createdAt)}`;

    this.mailerService
      .sendMail({
        to: owner.email,
        from: process.env.EMAIL_ID,
        subject: clientPdfSubject,
        template: 'client',
        context: clientTemplateContext,
        attachments: [
          {
            filename: `${clientPdfSubject}.pdf`,
            content: clientPdfFileBuffer,
            contentType: 'application/pdf',
          },
        ],
      })
      .then((success) => {
        console.log(success);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  private async sendEmailsToHotelOwners(result: IResult) {
    const hotelOwners = result.requests
      .map((request) => request.hotel.email)
      .filter((value, index, self) => self.indexOf(value) === index);

    for (const email of hotelOwners) {
      await this.sendEmailsToHotelOwner(email, result);
    }
  }

  private async sendEmailsToHotelOwner(
    hotelOwnerEmail: string,
    result: IResult,
  ) {
    const request = result.requests.find(
      (req) => req.hotel.email === hotelOwnerEmail,
    );
    const hotelTemplateContext = {
      request: {
        ...request,
        owner: {
          ...result.owner,
        },
        juridicalInfo: {
          ...result.juridicalInfo,
        },
      },
    };

    const hotelHtmlForPdf = await this.handlebarsService.renderTemplate(
      'hotel',
      hotelTemplateContext,
    );
    const hotelPdfFileBuffer = Buffer.from(
      await this.pdfService.generatePdf(hotelHtmlForPdf),
    );

    const hotelPdfSubject = `Запрос от ${hotelTemplateContext.request.juridicalInfo.name} от ${formatDate(hotelTemplateContext.request.createdAt)}`;

    this.mailerService
      .sendMail({
        to: hotelOwnerEmail,
        from: process.env.EMAIL_ID,
        subject: hotelPdfSubject,
        template: 'hotel',
        context: hotelTemplateContext,
        attachments: [
          {
            filename: `${hotelPdfSubject}.pdf`,
            content: hotelPdfFileBuffer,
            contentType: 'application/pdf',
          },
        ],
      })
      .then((success) => {
        console.log(`Email sent successfully to ${hotelOwnerEmail}`);
      })
      .catch((err) => {
        console.log(`Failed to send email to ${hotelOwnerEmail}: ${err}`);
      });
  }
}
