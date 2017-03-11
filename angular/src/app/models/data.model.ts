export interface PayRoll {
  employeeId: number;
  period: string;
  pay: number;
}

export interface UploadRes {
  duplicateReportId: boolean;
}