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
} from './supabaseTypes';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient<Database>(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY,
);

@Injectable()
export class AppService {
  constructor(private readonly mailerService: MailerService) {}

  getHello(): string {
    return 'Hello World!';
  }

  public async fetchDataAndSendEmail(body: {
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
            days: foodData.count || 0,
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
          count: requestData.people_count || 0,
          date: requestData.day_start || '',
          duration: Number(requestData.day_end) - Number(requestData.day_start),
          name: requestData.name || '',
          rooms: rooms,
          roomsTotalCost: 0,
          foodTotalCost: 0,
          hallsTotalCost: 0,
          halls: halls || [],
          food: food || [],
          hotel: hotel,
          totalCost: requestData.price,
          id: requestData.id,
        };

        result.requests.push(request);
      }

      results.push(result);
    }

    return results.length > 0 ? results[0] : 'No data found';
  }

  public async sendEmail(body: { id: string }): Promise<void> {
    const result = await this.fetchDataAndSendEmail({ id: body.id });

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
      this.mailerService
        .sendMail({
          to: email,
          from: process.env.EMAIL_ID,
          subject: 'Информация о клиенте',
          template: 'hotel', // Using the hotel.hbs template
          context: {
            request: {
              ...request,
              date_from: request.date,
              date_to: request.date,
              client: {
                ...result.client,
              },
            },
          },
        })
        .then((success) => {
          console.log(`Email sent successfully to ${email}`);
        })
        .catch((err) => {
          console.log(`Failed to send email to ${email}: ${err}`);
        });
    }

    this.mailerService
      .sendMail({
        to: result.client.email, // List of receivers email address
        from: process.env.EMAIL_ID, // Senders email address
        subject: 'Информация о вашем бронировании',
        template: 'client', // The `.hbs` extension is appended automatically.
        context: {
          request: result.requests[0], // Assuming you want to send the first request
        },
      })
      .then((success) => {
        console.log(success);
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
