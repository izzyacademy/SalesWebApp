
export class DepartmentSalesReportForDate {
  constructor(public department: string, public orderTotal: number) {}
}

export class ProductSalesReportForDate {
  constructor(public productId: number, public productName: string, public orderTotal: number) {}
}

export class MaxProductSales {

  constructor(public salesDate: string, public salesDateNum: number, public productId: number,
              public productName: string, public maxOrderAmount: number) {}
}

export class DepartmentDetail {
  constructor() {}
}

export class ProductDetail {
  constructor() {}
}
