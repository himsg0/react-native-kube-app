import firestore from "@react-native-firebase/firestore";
import TransactionModel from "../Model/TransactionModel";
import KubecoinModel from "../Model/KubeCoinsModel"

import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';




const transactionCollection = firestore().collection('transactions')
const coinsCollection = firestore().collection('kubecoins');
const userCollection = firestore().collection('users')





export const getTransactionId = () => {
    const transactionId: string = uuidv4();
      
     return transactionId;
}

export const getTransaction = async(userId : string) => {
    var transac : TransactionModel[] = []

    var debitTransac = await transactionCollection.where("debitUserId", "==", userId).get()
    var creditTransac = await transactionCollection.where("creditUserId", "==", userId).get()

    var debitTransacArray = debitTransac.docs
    var creditTransacArray = creditTransac.docs

    var transacArray = debitTransacArray.concat(creditTransacArray);

    transacArray.sort(function(a, b) {
        return b.data().createdAt.toDate() - a.data().createdAt.toDate();
    });

    transacArray.forEach((val) => {
        var values = val.data() as TransactionModel
        transac.push(values);
    })
    
    return transac ;
} 

export const getCoinPackages = async () => {
    var coinPackages : KubecoinModel[] = []
    await coinsCollection.get().then((res) => {
        res.forEach((val) => {
            var coins = val.data() as KubecoinModel
            coinPackages.push(coins)
        })
    })
    
    return coinPackages;
}

export const makeTransaction = async(props) => {

    const {creditUserId, debitUserId, credituser , debituser, transactionId, kubeCoin, status, paymentMode, billAmount, totalAmount} = props

    const findCreditUserName = (await userCollection.doc(creditUserId).get()).data()?.userName
    const findDebitUserName = await (await userCollection.doc(debitUserId).get()).data()?.userName

    const newTransaction = <TransactionModel>{
        transactionId: transactionId,
        creditUserId: creditUserId,
        debitUserId: debitUserId,
        debitUserName: findDebitUserName,
        creditUserName: findCreditUserName,
        debitUser: debituser,
        creditUser: credituser,
        status: status ? status : "",
        paymentMode: paymentMode ? paymentMode : "",
        billAmount: billAmount ? billAmount : 0,
        totalAmount: totalAmount ? totalAmount : 0,
        kubeCoin: kubeCoin,
        updatedAt: new Date,
        createdAt: new Date,
    }
// console.log(newTransaction);

    await transactionCollection.add(newTransaction);
}