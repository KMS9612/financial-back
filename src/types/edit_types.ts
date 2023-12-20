export interface newEditType {
  [x: string]: any;
  email: String;
  data: [
    {
      month: String;
      date: [
        {
          day: String;
          value: { financial_type: string; amount: number; place: string };
        }
      ];
    }
  ];
}
