export interface Income {
  id: number;

  title: string;

  amount: number;

  source: string;

  description?: string;

  payment_method: string;

  income_date: string;

  user_id: number;

  created_at: string;
}

export interface CreateIncome {
  title: string;

  amount: number;

  source: string;

  description?: string;

  payment_method: string;

  income_date: string;
}