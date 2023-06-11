export class History {
    constructor(
      public description: string,
      public happened_at: Date,
      public owner_name: string,
      public owner_type: string
    ) {}
  }