export class ContentSchema {
  ressource: {
      id: string; // It should be a Number but the data is in string format.
      resource_type: string;
      display_title: string;
      language: string;
      meaningful_description: string;
      additional_text: string;
      viewable: string;
      media_type: string;
      categorization: string;
      GUID: string;
      standards: {
          standard: [StandardSchema];
          resource_type_id: string;
          media_type_id: string;
      },
      resource_type_id: string;
      media_type_id: string;
  }
  name: string;
}

export class StandardSchema {
    "id": string;
    "description": string;
}

export class ResultSchema {
  uri: string;
  content: ContentSchema;
};
