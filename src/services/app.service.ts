import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import {
  Database,
  IClient,
  IFood,
  IHall,
  IHotel,
  IRequest,
  IResult,
  IRoom,
} from '../supabaseTypes';
import { createClient } from '@supabase/supabase-js';
import { HandlebarsService } from './handlebars.service';
import { PdfService } from './pdf.service';
import { formatDate } from '../utils/formatDate';

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

  getHello(): string {
    return 'Hello World!';
  }

  public async getResult(body: {
    id: string;
  }): Promise<IResult | string> {
    const { data, error } = await supabase
      .from('request_wrapper')
      .select('*')
      .eq('id', body.id);

    if (error) {
      console.log(error);
      return 'Error fetching data';
    }

    const results: IResult[] = [];

    const { data: clientData, error: clientError } = await supabase
      .from('juridical_info')
      .select('*')
      .eq('owner', data[0].owner)
      .single();

    if (clientError) {
      console.log('Error fetching client data 1:', clientError);
      return 'Error fetching client data';
    }

    const client: IClient = {
      name: clientData.name || '',
      address: clientData.address || '',
      phone: '',
      fax: '',
      email: '',
      okpo: clientData.OKPO || '',
      ogrn: clientData.OGRN || '',
      inn: clientData.INN || '',
      kpp: clientData.KPP || '',
      contact_name: clientData.lead || '',
      contact_email: '',
      contact_phone: '',
    };

    const { data: userData, error: userError } = await supabase
      .from('users')
      .select('*')
      .eq('id', data[0].owner)
      .single();

    if (userError) {
      console.log('Error fetching client data 2:', userError);
      return 'Error fetching client data';
    }

    client.email = userData.email;
    client.phone = userData.phone;
    client.contact_email = userData.email;
    client.contact_phone = userData.phone;

    for (const item of data) {
      const result: IResult = {
        name: item.name || '',
        email: '',
        requests: [],
        client: client,
      };

      for (let i = 0; i < item.requests_id.length; i++) {
        const { data: requestData, error: requestError } = await supabase
          .from('requests')
          .select('*')
          .eq('id', item.requests_id[i])
          .single();

        if (requestError) {
          console.log('116', requestError);
          continue;
        }

        const { data: hotelData, error: hotelError } = await supabase
          .from('hotel')
          .select('*')
          .eq('id', requestData.hotel)
          .single();

        if (hotelError) {
          console.log('127', hotelError);
          continue;
        }

        const { data: usersData, error: usersError } = await supabase
          .from('users')
          .select('*')
          .eq('uid', hotelData.owner_id)
          .single();

        if (usersError) {
          console.log('136', usersError);
          continue;
        }

        const hotel: IHotel = {
          name: hotelData.name || '',
          email: usersData.email || '',
          phone: '', //TODO PHONE
        };

        const { data: ownerData, error: ownerError } = await supabase
          .from('users')
          .select('*')
          .eq('id', item.owner)
          .single();

        if (ownerError) {
          console.log('155', ownerError);
          continue;
        }

        result.email = ownerData.email;

        const rooms: IRoom[] = [];
        for (const roomId of requestData.rooms) {
          const { data: roomData, error: roomError } = await supabase
            .from('requests_room_var')
            .select('*')
            .eq('id', roomId)
            .single();

          if (roomError) {
            console.log('170', roomError);
            continue;
          }

          rooms.push({
            type: roomData.room_name || '',
            name: roomData.room_name || '',
            quantity: roomData.room_count || 0,
            nights: roomData.room_count || 0,
            cost: roomData.price || 0,
          });
        }

        const food: IFood[] = [];
        for (const foodId of requestData.food) {
          const { data: foodData, error: foodError } = await supabase
            .from('requests_food_var')
            .select('*')
            .eq('id', foodId)
            .single();

          if (foodError) {
            console.log('192', foodError);
            continue;
          }

          food.push({
            packageName: foodData.name || '',
            quantity: foodData.count || 0,
            persons: foodData.persons_count || 0,
            cost: foodData.price,
          });
        }

        const halls: IHall[] = [];
        for (const hallId of requestData.halls) {
          const { data: hallData, error: hallError } = await supabase
            .from('requests_hall_var')
            .select('*')
            .eq('id', hallId)
            .single();

          if (hallError) {
            console.log('213', hallError);
            continue;
          }

          halls.push({
            name: hallData.hall_name || '',
            cost: hallData.price || 0,
            seating: hallData.seating || '',
            days: hallData.days || 0,
          });
        }

        const request: IRequest = {
          createdAt: requestData.created_at,
          count: requestData.people_count || 0,
          date: requestData.day_start || '',
          duration: requestData.duration || 0,
          name: requestData.name || '',
          rooms: rooms || [],
          roomsTotalCost: requestData.room_price,
          foodTotalCost: requestData.food_price,
          hallsTotalCost: requestData.hall_price,
          halls: halls || [],
          food: food || [],
          hotel: hotel,
          totalCost: requestData.price || 0,
          id: requestData.id || 0,
        };

        result.requests.push(request);
      }

      results.push(result);
    }

    return results.length > 0 ? results[0] : 'No data found';
  }

  public async sendEmail(body: { id: string }): Promise<void> {
    const result = await this.getResult({ id: body.id });

    if (typeof result === 'string') {
      console.log(result);
      return;
    }

    const hotelOwners = result.requests
      .map((request) => request.hotel.email)
      .filter((value, index, self) => self.indexOf(value) === index);

    for (const email of hotelOwners) {
      const request = result.requests.find((req) => req.hotel.email === email);
      console.log(result.client);

      const hotelTemplateContext = {
        request: {
          ...request,
          date_from: request.date,
          date_to: request.date,
          client: {
            ...result.client,
          },
        },
      };

      const hotelHtmlForPdf = await this.handlebarsService.renderTemplate('hotel', hotelTemplateContext);
      // const hotelPdfFileBuffer = Buffer.from(
      //   await this.pdfService.generatePdf(hotelHtmlForPdf)
      // );

      const hotelPdfSubject = `Запрос "${hotelTemplateContext.request.client.name}"
        от ${formatDate(hotelTemplateContext.request.createdAt)}
      `;

      this.mailerService
        .sendMail({
          to: email,
          from: process.env.EMAIL_ID,
          subject: hotelPdfSubject,
          template: 'hotel',
          context: hotelTemplateContext,
          attachments: [
            {
              filename: `${hotelPdfSubject}.pdf`,
              // content: hotelPdfFileBuffer,
              contentType: 'application/octet-stream'
            }
          ]
        })
        .then((success) => {
          console.log(`Email sent successfully to ${email}`);
        })
        .catch((err) => {
          console.log(`Failed to send email to ${email}: ${err}`);
        });
    }

    const clientTemplateContext =  {
      request: result.requests[0]
    };
    // const clientHtmlForPdf = await this.handlebarsService.renderTemplate('client', clientTemplateContext);
    // const clientPdfFileBuffer = Buffer.from(
    //   await this.pdfService.generatePdf(clientHtmlForPdf)
    // );

    const clientPdfSubject = `Ваш запрос в отель "${clientTemplateContext.request.hotel.name}"
      от ${formatDate(clientTemplateContext.request.createdAt)}
    `;

    this.mailerService
      .sendMail({
        to: result.client.email,
        from: process.env.EMAIL_ID,
        subject: clientPdfSubject,
        template: 'client',
        context: clientTemplateContext,
        attachments: [
          {
            filename: `${clientPdfSubject}.pdf`,
            // content: clientPdfFileBuffer,
            contentType: 'application/octet-stream'
          }
        ]
      })
      .then((success) => {
        console.log(success);
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
