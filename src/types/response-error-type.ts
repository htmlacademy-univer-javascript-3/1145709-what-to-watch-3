export type ErrorDetailsMessage = {
  errorType: string;
  message: string;
  details: {
    property: string;
    value: string;
    messages: string[];
  }[];
}
