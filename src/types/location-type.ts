export type LocationType = {
  address?: string;
  alias?: string;
  description?: string;
  id: string;
  managingOrganization?: string;
  name: string;
  npi?: string;
  partOf?: string;
  status?: string;
  tag?: string;
  taxId?: string;
  type?: string;
  updatedAt: string;
  telecom?: {
    rank?: string;
    system?: string;
    use?: string;
    value?: string;
  };
  tenant: string;
};
