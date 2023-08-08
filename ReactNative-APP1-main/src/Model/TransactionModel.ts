export default class TransactionModel {
    transactionId: string = "";
    creditUserId: string ="";
    debitUserId: string ="";
    debitUserName: string = "";
    creditUserName: string = "";
    debitUser: string = "";
    creditUser: string = "";
    status: string = "";
    paymentMode: string = "";
    billAmount: number = -1;
    totalAmount: number = -1;
    kubeCoin: number = 0;
    updatedAt: Date = new Date;
    createdAt: Date = new Date;
  
    // constructor(
    //   transactionid: string,
    //   debitusername: string,
    //   creditusername: string,
    //   debituser: string,
    //   credituser: string,
    //   billamount: number,
    //   totalamount: number,
    //   kubecoin: number,
    //   createdAt: Date
    // ) {
    //   this.transactionid = transactionid;
    //   this.debitusername = debitusername;
    //   this.creditusername = creditusername;
    //   this.debituser = debituser;
    //   this.credituser = credituser;
    //   this.billamount = billamount;
    //   this.totalamount = totalamount;
    //   this.kubecoin = kubecoin;
    //   this.createdAt = createdAt;
    // }
  }