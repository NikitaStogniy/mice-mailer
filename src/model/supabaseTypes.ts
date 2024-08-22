export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      center_distance: {
        Row: {
          created_at: string;
          first: number | null;
          id: number;
          isOn: boolean | null;
          second: number | null;
        };
        Insert: {
          created_at?: string;
          first?: number | null;
          id?: number;
          isOn?: boolean | null;
          second?: number | null;
        };
        Update: {
          created_at?: string;
          first?: number | null;
          id?: number;
          isOn?: boolean | null;
          second?: number | null;
        };
        Relationships: [];
      };
      city: {
        Row: {
          created_at: string;
          id: number;
          isOn: boolean | null;
          name: string | null;
        };
        Insert: {
          created_at?: string;
          id?: number;
          isOn?: boolean | null;
          name?: string | null;
        };
        Update: {
          created_at?: string;
          id?: number;
          isOn?: boolean | null;
          name?: string | null;
        };
        Relationships: [];
      };
      cms: {
        Row: {
          created_at: string;
          id: number;
          image: string | null;
          text1: string | null;
          text2: string | null;
          text3: string | null;
          title1: string | null;
          title2: string | null;
          title3: string | null;
          type: Database['public']['Enums']['ENUM_CMS'] | null;
        };
        Insert: {
          created_at?: string;
          id?: number;
          image?: string | null;
          text1?: string | null;
          text2?: string | null;
          text3?: string | null;
          title1?: string | null;
          title2?: string | null;
          title3?: string | null;
          type?: Database['public']['Enums']['ENUM_CMS'] | null;
        };
        Update: {
          created_at?: string;
          id?: number;
          image?: string | null;
          text1?: string | null;
          text2?: string | null;
          text3?: string | null;
          title1?: string | null;
          title2?: string | null;
          title3?: string | null;
          type?: Database['public']['Enums']['ENUM_CMS'] | null;
        };
        Relationships: [];
      };
      ethalonSeating: {
        Row: {
          created_at: string;
          icon: string | null;
          id: number;
          name: string | null;
        };
        Insert: {
          created_at?: string;
          icon?: string | null;
          id?: number;
          name?: string | null;
        };
        Update: {
          created_at?: string;
          icon?: string | null;
          id?: number;
          name?: string | null;
        };
        Relationships: [];
      };
      favorite_hotels: {
        Row: {
          created_at: string;
          hotel_id: number[] | null;
          id: number;
          name: string | null;
          owner: number | null;
        };
        Insert: {
          created_at?: string;
          hotel_id?: number[] | null;
          id?: number;
          name?: string | null;
          owner?: number | null;
        };
        Update: {
          created_at?: string;
          hotel_id?: number[] | null;
          id?: number;
          name?: string | null;
          owner?: number | null;
        };
        Relationships: [];
      };
      food: {
        Row: {
          created_at: string;
          id: number;
          name: string | null;
          positions: number[] | null;
          price: number | null;
          type: string | null;
        };
        Insert: {
          created_at?: string;
          id?: number;
          name?: string | null;
          positions?: number[] | null;
          price?: number | null;
          type?: string | null;
        };
        Update: {
          created_at?: string;
          id?: number;
          name?: string | null;
          positions?: number[] | null;
          price?: number | null;
          type?: string | null;
        };
        Relationships: [];
      };
      food_position: {
        Row: {
          created_at: string;
          id: number;
          name: string | null;
          price: number | null;
          type: Database['public']['Enums']['ENUM_foodposition'] | null;
        };
        Insert: {
          created_at?: string;
          id?: number;
          name?: string | null;
          price?: number | null;
          type?: Database['public']['Enums']['ENUM_foodposition'] | null;
        };
        Update: {
          created_at?: string;
          id?: number;
          name?: string | null;
          price?: number | null;
          type?: Database['public']['Enums']['ENUM_foodposition'] | null;
        };
        Relationships: [];
      };
      hall: {
        Row: {
          capacity: number | null;
          created_at: string;
          description: string | null;
          halfprice: number | null;
          hall_max_capacity: number | null;
          id: number;
          images: string[] | null;
          name: string | null;
          price: number | null;
          seating_banket: number | null;
          seating_class: number | null;
          seating_communication: number | null;
          seating_furshet: number | null;
          seating_kabare: number | null;
          seating_oshape: number | null;
          seating_theater: number | null;
          seating_ushape: number | null;
          seatings: number[] | null;
          services: number[] | null;
          size: number | null;
        };
        Insert: {
          capacity?: number | null;
          created_at?: string;
          description?: string | null;
          halfprice?: number | null;
          hall_max_capacity?: number | null;
          id?: number;
          images?: string[] | null;
          name?: string | null;
          price?: number | null;
          seating_banket?: number | null;
          seating_class?: number | null;
          seating_communication?: number | null;
          seating_furshet?: number | null;
          seating_kabare?: number | null;
          seating_oshape?: number | null;
          seating_theater?: number | null;
          seating_ushape?: number | null;
          seatings?: number[] | null;
          services?: number[] | null;
          size?: number | null;
        };
        Update: {
          capacity?: number | null;
          created_at?: string;
          description?: string | null;
          halfprice?: number | null;
          hall_max_capacity?: number | null;
          id?: number;
          images?: string[] | null;
          name?: string | null;
          price?: number | null;
          seating_banket?: number | null;
          seating_class?: number | null;
          seating_communication?: number | null;
          seating_furshet?: number | null;
          seating_kabare?: number | null;
          seating_oshape?: number | null;
          seating_theater?: number | null;
          seating_ushape?: number | null;
          seatings?: number[] | null;
          services?: number[] | null;
          size?: number | null;
        };
        Relationships: [];
      };
      hotel: {
        Row: {
          address: string | null;
          Capacity: number | null;
          city: number | null;
          city_name: string | null;
          created_at: string;
          description: string | null;
          distance_center: number | null;
          food: number[] | null;
          hall: number[] | null;
          Hall_max_capacity: number | null;
          id: number;
          images: string[] | null;
          isVisible: boolean | null;
          map_link: string | null;
          name: string | null;
          owner_id: string[] | null;
          rooms: number[] | null;
          services: number[] | null;
          stars: number | null;
        };
        Insert: {
          address?: string | null;
          Capacity?: number | null;
          city?: number | null;
          city_name?: string | null;
          created_at?: string;
          description?: string | null;
          distance_center?: number | null;
          food?: number[] | null;
          hall?: number[] | null;
          Hall_max_capacity?: number | null;
          id?: number;
          images?: string[] | null;
          isVisible?: boolean | null;
          map_link?: string | null;
          name?: string | null;
          owner_id?: string[] | null;
          rooms?: number[] | null;
          services?: number[] | null;
          stars?: number | null;
        };
        Update: {
          address?: string | null;
          Capacity?: number | null;
          city?: number | null;
          city_name?: string | null;
          created_at?: string;
          description?: string | null;
          distance_center?: number | null;
          food?: number[] | null;
          hall?: number[] | null;
          Hall_max_capacity?: number | null;
          id?: number;
          images?: string[] | null;
          isVisible?: boolean | null;
          map_link?: string | null;
          name?: string | null;
          owner_id?: string[] | null;
          rooms?: number[] | null;
          services?: number[] | null;
          stars?: number | null;
        };
        Relationships: [];
      };
      juridical_info: {
        Row: {
          address: string | null;
          bank_BIC: string | null;
          bank_INN: string | null;
          bank_korr: string | null;
          bank_KPP: string | null;
          bank_name: string | null;
          bank_RC: string | null;
          created_at: string;
          id: number;
          INN: string | null;
          KPP: string | null;
          lead: string | null;
          name: string | null;
          OGRN: string | null;
          OKPO: string | null;
          owner: number | null;
        };
        Insert: {
          address?: string | null;
          bank_BIC?: string | null;
          bank_INN?: string | null;
          bank_korr?: string | null;
          bank_KPP?: string | null;
          bank_name?: string | null;
          bank_RC?: string | null;
          created_at?: string;
          id?: number;
          INN?: string | null;
          KPP?: string | null;
          lead?: string | null;
          name?: string | null;
          OGRN?: string | null;
          OKPO?: string | null;
          owner?: number | null;
        };
        Update: {
          address?: string | null;
          bank_BIC?: string | null;
          bank_INN?: string | null;
          bank_korr?: string | null;
          bank_KPP?: string | null;
          bank_name?: string | null;
          bank_RC?: string | null;
          created_at?: string;
          id?: number;
          INN?: string | null;
          KPP?: string | null;
          lead?: string | null;
          name?: string | null;
          OGRN?: string | null;
          OKPO?: string | null;
          owner?: number | null;
        };
        Relationships: [];
      };
      place: {
        Row: {
          created_at: string;
          id: number;
          name: string | null;
          owner: string | null;
        };
        Insert: {
          created_at?: string;
          id?: number;
          name?: string | null;
          owner?: string | null;
        };
        Update: {
          created_at?: string;
          id?: number;
          name?: string | null;
          owner?: string | null;
        };
        Relationships: [];
      };
      request_wrapper: {
        Row: {
          created_at: string;
          id: number;
          name: string | null;
          owner: number | null;
          requests_id: number[] | null;
        };
        Insert: {
          created_at?: string;
          id?: number;
          name?: string | null;
          owner?: number | null;
          requests_id?: number[] | null;
        };
        Update: {
          created_at?: string;
          id?: number;
          name?: string | null;
          owner?: number | null;
          requests_id?: number[] | null;
        };
        Relationships: [];
      };
      requests: {
        Row: {
          Complete: boolean | null;
          created_at: string;
          day_end: string | null;
          day_start: string | null;
          food: number[] | null;
          food_original_id: number[] | null;
          food_price: number | null;
          hall_price: number | null;
          halls: number[] | null;
          duration: number | null;
          halls_original_id: number[] | null;
          hotel: number | null;
          hotel_name: string | null;
          id: number;
          inProgress: boolean | null;
          name: string | null;
          owner: number | null;
          people_count: number | null;
          price: number | null;
          room_original_id: number[] | null;
          room_price: number | null;
          rooms: number[] | null;
          wrapper_id: number | null;
        };
        Insert: {
          Complete?: boolean | null;
          created_at?: string;
          day_end?: string | null;
          day_start?: string | null;
          food?: number[] | null;
          food_original_id?: number[] | null;
          food_price?: number | null;
          hall_price?: number | null;
          halls?: number[] | null;
          halls_original_id?: number[] | null;
          hotel?: number | null;
          hotel_name?: string | null;
          id?: number;
          inProgress?: boolean | null;
          name?: string | null;
          owner?: number | null;
          people_count?: number | null;
          price?: number | null;
          room_original_id?: number[] | null;
          room_price?: number | null;
          rooms?: number[] | null;
          wrapper_id?: number | null;
        };
        Update: {
          Complete?: boolean | null;
          created_at?: string;
          day_end?: string | null;
          day_start?: string | null;
          food?: number[] | null;
          food_original_id?: number[] | null;
          food_price?: number | null;
          hall_price?: number | null;
          halls?: number[] | null;
          halls_original_id?: number[] | null;
          hotel?: number | null;
          hotel_name?: string | null;
          id?: number;
          inProgress?: boolean | null;
          name?: string | null;
          owner?: number | null;
          people_count?: number | null;
          price?: number | null;
          room_original_id?: number[] | null;
          room_price?: number | null;
          rooms?: number[] | null;
          wrapper_id?: number | null;
        };
        Relationships: [];
      };
      requests_food_var: {
        Row: {
          count: number | null;
          created_at: string;
          food_id: number | null;
          id: number;
          name: string | null;
          owner: number | null;
          persons_count: number | null;
          price: number | null;
          request_id: number | null;
        };
        Insert: {
          count?: number | null;
          created_at?: string;
          food_id?: number | null;
          id?: number;
          name?: string | null;
          owner?: number | null;
          persons_count?: number | null;
          price?: number | null;
          request_id?: number | null;
        };
        Update: {
          count?: number | null;
          created_at?: string;
          food_id?: number | null;
          id?: number;
          name?: string | null;
          owner?: number | null;
          persons_count?: number | null;
          price?: number | null;
          request_id?: number | null;
        };
        Relationships: [];
      };
      requests_hall_var: {
        Row: {
          created_at: string;
          days: number | null;
          hall_id: number | null;
          hall_name: string | null;
          id: number;
          owner: number | null;
          price: number | null;
          request_id: number | null;
          seating: string | null;
        };
        Insert: {
          created_at?: string;
          days?: number | null;
          hall_id?: number | null;
          hall_name?: string | null;
          id?: number;
          owner?: number | null;
          price?: number | null;
          request_id?: number | null;
          seating?: string | null;
        };
        Update: {
          created_at?: string;
          days?: number | null;
          hall_id?: number | null;
          hall_name?: string | null;
          id?: number;
          owner?: number | null;
          price?: number | null;
          request_id?: number | null;
          seating?: string | null;
        };
        Relationships: [];
      };
      requests_room_var: {
        Row: {
          created_at: string;
          days: number | null;
          id: number;
          owner: number | null;
          price: number | null;
          request_id: number | null;
          room_count: number | null;
          room_id: number | null;
          room_name: string | null;
        };
        Insert: {
          created_at?: string;
          days?: number | null;
          id?: number;
          owner?: number | null;
          price?: number | null;
          request_id?: number | null;
          room_count?: number | null;
          room_id?: number | null;
          room_name?: string | null;
        };
        Update: {
          created_at?: string;
          days?: number | null;
          id?: number;
          owner?: number | null;
          price?: number | null;
          request_id?: number | null;
          room_count?: number | null;
          room_id?: number | null;
          room_name?: string | null;
        };
        Relationships: [];
      };
      room: {
        Row: {
          count: number | null;
          created_at: string;
          description: string | null;
          id: number;
          images: string[] | null;
          name: string | null;
          price: number | null;
          services: number[] | null;
          show_single: boolean | null;
          single_price: number | null;
        };
        Insert: {
          count?: number | null;
          created_at?: string;
          description?: string | null;
          id?: number;
          images?: string[] | null;
          name?: string | null;
          price?: number | null;
          services?: number[] | null;
          show_single?: boolean | null;
          single_price?: number | null;
        };
        Update: {
          count?: number | null;
          created_at?: string;
          description?: string | null;
          id?: number;
          images?: string[] | null;
          name?: string | null;
          price?: number | null;
          services?: number[] | null;
          show_single?: boolean | null;
          single_price?: number | null;
        };
        Relationships: [];
      };
      seating: {
        Row: {
          capacity: number | null;
          created_at: string;
          hall: number | null;
          id: number;
          seatingID: number | null;
        };
        Insert: {
          capacity?: number | null;
          created_at?: string;
          hall?: number | null;
          id?: number;
          seatingID?: number | null;
        };
        Update: {
          capacity?: number | null;
          created_at?: string;
          hall?: number | null;
          id?: number;
          seatingID?: number | null;
        };
        Relationships: [];
      };
      service: {
        Row: {
          category: number | null;
          created_at: string;
          description: string | null;
          id: number;
          isOn: boolean | null;
          name: string | null;
          type: Database['public']['Enums']['ENUM_type'] | null;
        };
        Insert: {
          category?: number | null;
          created_at?: string;
          description?: string | null;
          id?: number;
          isOn?: boolean | null;
          name?: string | null;
          type?: Database['public']['Enums']['ENUM_type'] | null;
        };
        Update: {
          category?: number | null;
          created_at?: string;
          description?: string | null;
          id?: number;
          isOn?: boolean | null;
          name?: string | null;
          type?: Database['public']['Enums']['ENUM_type'] | null;
        };
        Relationships: [];
      };
      service_category: {
        Row: {
          created_at: string;
          id: number;
          name: string | null;
          services_id: number[] | null;
          type: Database['public']['Enums']['ENUM_type'] | null;
        };
        Insert: {
          created_at?: string;
          id?: number;
          name?: string | null;
          services_id?: number[] | null;
          type?: Database['public']['Enums']['ENUM_type'] | null;
        };
        Update: {
          created_at?: string;
          id?: number;
          name?: string | null;
          services_id?: number[] | null;
          type?: Database['public']['Enums']['ENUM_type'] | null;
        };
        Relationships: [];
      };
      user_desires: {
        Row: {
          center_distance: number | null;
          city: number | null;
          created_at: string;
          hall_capacity: number | null;
          hotel_capacity: number | null;
          id: number;
          owner: number | null;
          services: number[] | null;
          stars: number | null;
        };
        Insert: {
          center_distance?: number | null;
          city?: number | null;
          created_at?: string;
          hall_capacity?: number | null;
          hotel_capacity?: number | null;
          id?: number;
          owner?: number | null;
          services?: number[] | null;
          stars?: number | null;
        };
        Update: {
          center_distance?: number | null;
          city?: number | null;
          created_at?: string;
          hall_capacity?: number | null;
          hotel_capacity?: number | null;
          id?: number;
          owner?: number | null;
          services?: number[] | null;
          stars?: number | null;
        };
        Relationships: [];
      };
      users: {
        Row: {
          created_at: string;
          desires: number | null;
          email: string | null;
          favorite_hotels: number[] | null;
          id: number;
          jobTitle: string | null;
          last_request: string | null;
          name: string | null;
          network: string | null;
          notification_food: boolean | null;
          notification_hall: boolean | null;
          notification_hotel: boolean | null;
          notification_price: boolean | null;
          notification_room: boolean | null;
          phone: string | null;
          role: Database['public']['Enums']['ENUM_role'] | null;
          uid: string;
        };
        Insert: {
          created_at?: string;
          desires?: number | null;
          email?: string | null;
          favorite_hotels?: number[] | null;
          id?: number;
          jobTitle?: string | null;
          last_request?: string | null;
          name?: string | null;
          network?: string | null;
          notification_food?: boolean | null;
          notification_hall?: boolean | null;
          notification_hotel?: boolean | null;
          notification_price?: boolean | null;
          notification_room?: boolean | null;
          phone?: string | null;
          role?: Database['public']['Enums']['ENUM_role'] | null;
          uid?: string;
        };
        Update: {
          created_at?: string;
          desires?: number | null;
          email?: string | null;
          favorite_hotels?: number[] | null;
          id?: number;
          jobTitle?: string | null;
          last_request?: string | null;
          name?: string | null;
          network?: string | null;
          notification_food?: boolean | null;
          notification_hall?: boolean | null;
          notification_hotel?: boolean | null;
          notification_price?: boolean | null;
          notification_room?: boolean | null;
          phone?: string | null;
          role?: Database['public']['Enums']['ENUM_role'] | null;
          uid?: string;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      ENUM_CMS: 'ABOUT' | 'WHYUS';
      ENUM_foodposition:
        | 'Холодные закуски'
        | 'Горячие закуски'
        | 'Горячее блюдо'
        | 'Десерт'
        | 'Напитки';
      ENUM_role: 'CLIENT' | 'HOTEL' | 'SUPERUSER';
      ENUM_seating:
        | 'theatre'
        | 'class'
        | 'communication'
        | 'ushape'
        | 'oshape'
        | 'cabare'
        | 'banket'
        | 'furshet';
      ENUM_type: 'HOTEL' | 'ROOM' | 'HALL' | 'FOOD';
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type PublicSchema = Database[Extract<keyof Database, 'public'>];

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema['Tables'] & PublicSchema['Views'])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions['schema']]['Tables'] &
        Database[PublicTableNameOrOptions['schema']]['Views'])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions['schema']]['Tables'] &
      Database[PublicTableNameOrOptions['schema']]['Views'])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema['Tables'] &
      PublicSchema['Views'])
  ? (PublicSchema['Tables'] &
      PublicSchema['Views'])[PublicTableNameOrOptions] extends {
      Row: infer R;
    }
    ? R
    : never
  : never;

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema['Tables']
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema['Tables']
  ? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
      Insert: infer I;
    }
    ? I
    : never
  : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema['Tables']
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema['Tables']
  ? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
      Update: infer U;
    }
    ? U
    : never
  : never;

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema['Enums']
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions['schema']]['Enums']
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions['schema']]['Enums'][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema['Enums']
  ? PublicSchema['Enums'][PublicEnumNameOrOptions]
  : never;

