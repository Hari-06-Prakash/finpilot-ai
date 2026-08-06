export interface Expense {
  id: number;

  title: string;

  amount: number;

  description: string;

  merchant: string;

  payment_method: string;

  category_id: number;

  expense_date: string;

  created_at: string;
}