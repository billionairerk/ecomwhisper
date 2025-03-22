export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      alerts: {
        Row: {
          id: string
          is_read: boolean | null
          message: string
          timestamp: string | null
          user_id: string | null
        }
        Insert: {
          id?: string
          is_read?: boolean | null
          message: string
          timestamp?: string | null
          user_id?: string | null
        }
        Update: {
          id?: string
          is_read?: boolean | null
          message?: string
          timestamp?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      backlinks: {
        Row: {
          competitor_id: string | null
          domain_authority: number | null
          id: string
          source_url: string | null
          timestamp: string | null
        }
        Insert: {
          competitor_id?: string | null
          domain_authority?: number | null
          id?: string
          source_url?: string | null
          timestamp?: string | null
        }
        Update: {
          competitor_id?: string | null
          domain_authority?: number | null
          id?: string
          source_url?: string | null
          timestamp?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "backlinks_competitor_id_fkey"
            columns: ["competitor_id"]
            isOneToOne: false
            referencedRelation: "competitors"
            referencedColumns: ["id"]
          },
        ]
      }
      competitors: {
        Row: {
          created_at: string | null
          domain: string
          id: string
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          domain: string
          id?: string
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          domain?: string
          id?: string
          user_id?: string | null
        }
        Relationships: []
      }
      content: {
        Row: {
          competitor_id: string | null
          content_text: string | null
          id: string
          timestamp: string | null
          title: string | null
          type: string | null
          url: string
        }
        Insert: {
          competitor_id?: string | null
          content_text?: string | null
          id?: string
          timestamp?: string | null
          title?: string | null
          type?: string | null
          url: string
        }
        Update: {
          competitor_id?: string | null
          content_text?: string | null
          id?: string
          timestamp?: string | null
          title?: string | null
          type?: string | null
          url?: string
        }
        Relationships: [
          {
            foreignKeyName: "content_competitor_id_fkey"
            columns: ["competitor_id"]
            isOneToOne: false
            referencedRelation: "competitors"
            referencedColumns: ["id"]
          },
        ]
      }
      keywords: {
        Row: {
          created_at: string | null
          id: string
          keyword: string
          search_engine: string
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          keyword: string
          search_engine: string
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          keyword?: string
          search_engine?: string
          user_id?: string | null
        }
        Relationships: []
      }
      rankings: {
        Row: {
          competitor_id: string | null
          id: string
          keyword_id: string | null
          position: number | null
          timestamp: string | null
          traffic_estimate: number | null
        }
        Insert: {
          competitor_id?: string | null
          id?: string
          keyword_id?: string | null
          position?: number | null
          timestamp?: string | null
          traffic_estimate?: number | null
        }
        Update: {
          competitor_id?: string | null
          id?: string
          keyword_id?: string | null
          position?: number | null
          timestamp?: string | null
          traffic_estimate?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "rankings_competitor_id_fkey"
            columns: ["competitor_id"]
            isOneToOne: false
            referencedRelation: "competitors"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "rankings_keyword_id_fkey"
            columns: ["keyword_id"]
            isOneToOne: false
            referencedRelation: "keywords"
            referencedColumns: ["id"]
          },
        ]
      }
      scraped_pages: {
        Row: {
          competitor_id: string | null
          created_at: string | null
          id: string
          page_title: string | null
          page_url: string
          word_count: number
        }
        Insert: {
          competitor_id?: string | null
          created_at?: string | null
          id?: string
          page_title?: string | null
          page_url: string
          word_count: number
        }
        Update: {
          competitor_id?: string | null
          created_at?: string | null
          id?: string
          page_title?: string | null
          page_url?: string
          word_count?: number
        }
        Relationships: [
          {
            foreignKeyName: "scraped_pages_competitor_id_fkey"
            columns: ["competitor_id"]
            isOneToOne: false
            referencedRelation: "competitors"
            referencedColumns: ["id"]
          },
        ]
      }
      seo_metrics: {
        Row: {
          backlinks: number
          competitor_id: string | null
          created_at: string | null
          domain_authority: number
          id: string
          traffic_estimate: number
        }
        Insert: {
          backlinks: number
          competitor_id?: string | null
          created_at?: string | null
          domain_authority: number
          id?: string
          traffic_estimate: number
        }
        Update: {
          backlinks?: number
          competitor_id?: string | null
          created_at?: string | null
          domain_authority?: number
          id?: string
          traffic_estimate?: number
        }
        Relationships: [
          {
            foreignKeyName: "seo_metrics_competitor_id_fkey"
            columns: ["competitor_id"]
            isOneToOne: false
            referencedRelation: "competitors"
            referencedColumns: ["id"]
          },
        ]
      }
      suggestions: {
        Row: {
          id: string
          suggestion: string
          timestamp: string | null
          type: string | null
          user_id: string | null
        }
        Insert: {
          id?: string
          suggestion: string
          timestamp?: string | null
          type?: string | null
          user_id?: string | null
        }
        Update: {
          id?: string
          suggestion?: string
          timestamp?: string | null
          type?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      table: {
        Row: {
          created_at: string
          id: number
        }
        Insert: {
          created_at?: string
          id?: number
        }
        Update: {
          created_at?: string
          id?: number
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
