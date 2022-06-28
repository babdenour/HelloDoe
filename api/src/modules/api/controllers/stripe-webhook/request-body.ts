export interface RequestBody {
  type: string;
  data: {
    object: {
      customer_email: string;
      metadata: {
        missionCode: string;
        missionId: string;
        [k: string]: string;
      };
    };
  };
}
