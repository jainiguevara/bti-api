const xmlparser = require('js2xmlparser');

const parseCBAuth = () => {
  return {
    username: process.env.CB_USERNAME,
    password: process.env.CB_PASSWORD,
  };
};

// const parseCBAuth = () => {
//   const args0 = {
//     username: {
//       // '@': {
//       //   'xsi:type' : 'xsd:string'
//       // },
//       '#': process.env.CB_USERNAME
//     },
//     password: {
//       // '@': {
//       //   'xsi:type' : 'xsd:string'
//       // },
//       '#': process.env.CB_PASSWORD
//     },
//   };
//   return xmlparser.parse('args0', args0, { declaration: { include: false } });
// };

const parseCBPayload = (payload = {}) => {
  const args1 = {
    dtRemittance: {
      // '@': {
      //   'xsi:type' : 'xsd:string'
      // },
      '#': payload.dtRemittance ? payload.dtRemittance : ''
    },
    remitterId: {
      // '@': {
      //   'xsi:type' : 'xsd:string'
      // },
      '#': payload.remitterId ? payload.remitterId : ''
    },
    remitterLastName: {
      // '@': {
      //   'xsi:type' : 'xsd:string'
      // },
      '#': payload.remitterLastName ? payload.remitterLastName : ''
    },
    remitterFirstName: {
      // '@': {
      //   'xsi:type' : 'xsd:string'
      // },
      '#': payload.remitterFirstName ? payload.remitterFirstName : ''
    },
    remitterMiddleName: {
      // '@': {
      //   'xsi:type' : 'xsd:string'
      // },
      '#': payload.remitterMiddleName ? payload.remitterMiddleName : ''
    },
    remitterCustType: {
      // '@': {
      //   'xsi:type' : 'xsd:string'
      // },
      '#': payload.remitterCustType ? payload.remitterCustType : ''
    },
    remitterAddr1: {
      // '@': {
      //   'xsi:type' : 'xsd:string'
      // },
      '#': payload.remitterAddr1 ? payload.remitterAddr1 : ''
    },
    remitterAddr2: {
      // '@': {
      //   'xsi:type' : 'xsd:string'
      // },
      '#': payload.remitterAddr2 ? payload.remitterAddr2 : ''
    },
    remitterAddr3: {
      // '@': {
      //   'xsi:type' : 'xsd:string'
      // },
      '#': payload.remitterAddr3 ? payload.remitterAddr3 : ''
    },
    remitterCountry: {
      // '@': {
      //   'xsi:type' : 'xsd:string'
      // },
      '#': payload.remitterCountry ? payload.remitterCountry : ''
    },
    remitterPoBox: {
      // '@': {
      //   'xsi:type' : 'xsd:string'
      // },
      '#': payload.remitterPoBox ? payload.remitterPoBox : ''
    },
    remitterEmailAddr: {
      // '@': {
      //   'xsi:type' : 'xsd:string'
      // },
      '#': payload.remitterEmailAddr ? payload.remitterEmailAddr : ''
    },
    remitterIdType1: {
      // '@': {
      //   'xsi:type' : 'xsd:string'
      // },
      '#': payload.remitterIdType1 ? payload.remitterIdType1 : ''
    },
    remitterIdNumber1: {
      // '@': {
      //   'xsi:type' : 'xsd:string'
      // },
      '#': payload.remitterIdNumber1 ? payload.remitterIdNumber1 : ''
    },
    remitterIdIssueAt1: {
      // '@': {
      //   'xsi:type' : 'xsd:string'
      // },
      '#': payload.remitterIdIssueAt1 ? payload.remitterIdIssueAt1 : ''
    },
    remitterExpiryDate1: {
      // '@': {
      //   'xsi:type' : 'xsd:string'
      // },
      '#': payload.remitterExpiryDate1 ? payload.remitterExpiryDate1 : ''
    },
    remitterIdType2: {
      // '@': {
      //   'xsi:type' : 'xsd:string'
      // },
      '#': payload.remitterIdType2 ? payload.remitterIdType2 : ''
    },
    remitterIdNumber2: {
      // '@': {
      //   'xsi:type' : 'xsd:string'
      // },
      '#': payload.remitterIdNumber2 ? payload.remitterIdNumber2 : ''
    },
    remitterIdIssueAt2: {
      // '@': {
      //   'xsi:type' : 'xsd:string'
      // },
      '#': payload.remitterIdIssueAt2 ? payload.remitterIdIssueAt2 : ''
    },
    remitterExpiryDate2: {
      // '@': {
      //   'xsi:type' : 'xsd:string'
      // },
      '#': payload.remitterExpiryDate2 ? payload.remitterExpiryDate2 : ''
    },
    remitterNotificationType : payload.remitterNotificationType ? payload.remitterNotificationType : 0,
    remitterZipCode: payload.remitterZipCode ? payload.remitterZipCode : 0,
    remitterBdate: {
      // '@': {
      //   'xsi:type' : 'xsd:string'
      // },
      '#': payload.remitterBdate ? payload.remitterBdate : ''
    },
    remitterNationality: {
      // '@': {
      //   'xsi:type' : 'xsd:string'
      // },
      '#': payload.remitterNationality ? payload.remitterNationality : ''
    },
    remitterGender: {
      // '@': {
      //   'xsi:type' : 'xsd:string'
      // },
      '#': payload.remitterGender ? payload.remitterGender : ''
    },
    remitterCivilStatus: {
      // '@': {
      //   'xsi:type' : 'xsd:string'
      // },
      '#': payload.remitterCivilStatus ? payload.remitterCivilStatus : ''
    },
    remitterMobileNumber: {
      // '@': {
      //   'xsi:type' : 'xsd:string'
      // },
      '#': payload.remitterMobileNumber ? payload.remitterMobileNumber : ''
    },
    remitterTin: payload.remitterTin ? payload.remitterTin : 0,
    remitterContinent: {
      // '@': {
      //   'xsi:type' : 'xsd:string'
      // },
      '#': payload.remitterContinent ? payload.remitterContinent : ''
    },
    remitterOfficePhoneNumber: {
      // '@': {
      //   'xsi:type' : 'xsd:string'
      // },
      '#': payload.remitterOfficePhoneNumber ? payload.remitterOfficePhoneNumber : ''
    },
    beneId: {
      // '@': {
      //   'xsi:type' : 'xsd:string'
      // },
      '#': payload.beneId ? payload.beneId : ''
    },
    beneLastName: {
      // '@': {
      //   'xsi:type' : 'xsd:string'
      // },
      '#': payload.beneLastName ? payload.beneLastName : ''
    },
    benefirstName: {
      // '@': {
      //   'xsi:type' : 'xsd:string'
      // },
      '#': payload.benefirstName ? payload.benefirstName : ''
    },
    beneMiddleName: {
      // '@': {
      //   'xsi:type' : 'xsd:string'
      // },
      '#': payload.beneMiddleName ? payload.beneMiddleName : ''
    },
    beneCustType: {
      // '@': {
      //   'xsi:type' : 'xsd:string'
      // },
      '#': payload.beneCustType ? payload.beneCustType : ''
    },
    beneAddr1: {
      // '@': {
      //   'xsi:type' : 'xsd:string'
      // },
      '#': payload.beneAddr1 ? payload.beneAddr1 : ''
    },
    beneAddr2: {
      // '@': {
      //   'xsi:type' : 'xsd:string'
      // },
      '#': payload.beneAddr2 ? payload.beneAddr2 : ''
    },
    beneAddr3: {
      // '@': {
      //   'xsi:type' : 'xsd:string'
      // },
      '#': payload.beneAddr3 ? payload.beneAddr3 : ''
    },
    beneCountry: {
      // '@': {
      //   'xsi:type' : 'xsd:string'
      // },
      '#': payload.beneCountry ? payload.beneCountry : ''
    },
    beneLandmark: {
      // '@': {
      //   'xsi:type' : 'xsd:string'
      // },
      '#': payload.beneLandmark ? payload.beneLandmark : ''
    },
    beneProfession: {
      // '@': {
      //   'xsi:type' : 'xsd:string'
      // },
      '#': payload.beneProfession ? payload.beneProfession : ''
    },
    benePoBox: {
      // '@': {
      //   'xsi:type' : 'xsd:string'
      // },
      '#': payload.benePoBox ? payload.benePoBox : ''
    },
    beneOfficePhoneNumber: {
      // '@': {
      //   'xsi:type' : 'xsd:string'
      // },
      '#': payload.beneOfficePhoneNumber ? payload.beneOfficePhoneNumber : ''
    },
    beneEmail: {
      // '@': {
      //   'xsi:type' : 'xsd:string'
      // },
      '#': payload.beneEmail ? payload.beneEmail : ''
    },
    beneNotificationType: {
      // '@': {
      //   'xsi:type' : 'xsd:string'
      // },
      '#': payload.beneNotificationType ? payload.beneNotificationType : ''
    },
    beneZipCode: {
      // '@': {
      //   'xsi:type' : 'xsd:string'
      // },
      '#': payload.beneZipCode ? payload.beneZipCode : ''
    },
    beneBdate: {
      // '@': {
      //   'xsi:type' : 'xsd:string'
      // },
      '#': payload.beneBdate ? payload.beneBdate : ''
    },
    beneNationality: {
      // '@': {
      //   'xsi:type' : 'xsd:string'
      // },
      '#': payload.beneNationality ? payload.beneNationality : ''
    },
    beneGender: {
      // '@': {
      //   'xsi:type' : 'xsd:string'
      // },
      '#': payload.beneGender ? payload.beneGender : ''
    },
    beneCivilStatus: {
      // '@': {
      //   'xsi:type' : 'xsd:string'
      // },
      '#': payload.beneCivilStatus ? payload.beneCivilStatus : ''
    },
    beneMobileNo: {
      // '@': {
      //   'xsi:type' : 'xsd:string'
      // },
      '#': payload.beneMobileNo ? payload.beneMobileNo : ''
    },
    beneTin: {
      // '@': {
      //   'xsi:type' : 'xsd:string'
      // },
      '#': payload.beneTin ? payload.beneTin : ''
    },
    beneRelationToRemitter: {
      // '@': {
      //   'xsi:type' : 'xsd:string'
      // },
      '#': payload.beneRelationToRemitter ? payload.beneRelationToRemitter : ''
    },
    altRecRelToBene: {
      // '@': {
      //   'xsi:type' : 'xsd:string'
      // },
      '#': payload.altRecRelToBene ? payload.altRecRelToBene : ''
    },
    applicationNumber: {
      // '@': {
      //   'xsi:type' : 'xsd:string'
      // },
      '#': payload.applicationNumber ? payload.applicationNumber : ''
    },
    serviceCode: payload.serviceCode ? payload.serviceCode : 0,
    accountNumber: {
      // '@': {
      //   'xsi:type' : 'xsd:string'
      // },
      '#': payload.accountNumber ? payload.accountNumber : ''
    },
    bankCode: {
      // '@': {
      //   'xsi:type' : 'xsd:string'
      // },
      '#': payload.bankCode ? payload.bankCode : ''
    },
    branchCode: {
      // '@': {
      //   'xsi:type' : 'xsd:string'
      // },
      '#': payload.branchCode ? payload.branchCode : ''
    },
    accountType: payload.accountType ? payload.accountType : 0,
    accountName: {
      // '@': {
      //   'xsi:type' : 'xsd:string'
      // },
      '#': payload.accountName ? payload.accountName : ''
    },
    branchName: {
      // '@': {
      //   'xsi:type' : 'xsd:string'
      // },
      '#': payload.branchName ? payload.branchName : ''
    },
    xmitCcyCd : payload.xmitCcyCd ? payload.xmitCcyCd : 0,
    xmitAmount : payload.xmitAmount ? payload.xmitAmount : 0,
    counterCharge : payload.counterCharge ? payload.counterCharge : 0,
    isWaived : payload.isWaived ? payload.isWaived : 0,
    otherCharges : payload.otherCharges ? payload.otherCharges : 0,
    beneCcyCd: {
      // '@': {
      //   'xsi:type' : 'xsd:string'
      // },
      '#': payload.beneCcyCd ? payload.beneCcyCd : ''
    },
    beneAmtConv : payload.beneAmtConv ? payload.beneAmtConv : 0,
    outletCd: {
      // '@': {
      //   'xsi:type' : 'xsd:string'
      // },
      '#': payload.outletCd ? payload.outletCd : ''
    },
    bankName: {
      // '@': {
      //   'xsi:type' : 'xsd:string'
      // },
      '#': payload.bankName ? payload.bankName : ''
    },
    cardNo: {
      // '@': {
      //   'xsi:type' : 'xsd:string'
      // },
      '#': payload.cardNo ? payload.cardNo : ''
    },
    paymentField1: {
      // '@': {
      //   'xsi:type' : 'xsd:string'
      // },
      '#': payload.paymentField1 ? payload.paymentField1 : ''
    },
    paymentField2: {
      // '@': {
      //   'xsi:type' : 'xsd:string'
      // },
      '#': payload.paymentField2 ? payload.paymentField2 : ''
    },
    paymentField3: {
      // '@': {
      //   'xsi:type' : 'xsd:string'
      // },
      '#': payload.paymentField3 ? payload.paymentField3 : ''
    },
    rtBuyingApplied : payload.rtBuyingApplied ? payload.rtBuyingApplied : 0,
    paymentField4: {
      // '@': {
      //   'xsi:type' : 'xsd:string'
      // },
      '#': payload.paymentField4 ? payload.paymentField4 : ''
    },
    paymentField5: {
      // '@': {
      //   'xsi:type' : 'xsd:string'
      // },
      '#': payload.paymentField5 ? payload.paymentField5 : ''
    },
    outletBranchCd: {
      // '@': {
      //   'xsi:type' : 'xsd:string'
      // },
      '#': payload.outletBranchCd ? payload.outletBranchCd : ''
    },
    altBeneName: {
      // '@': {
      //   'xsi:type' : 'xsd:string'
      // },
      '#': payload.altBeneName ? payload.altBeneName : ''
    },
    altBeneRelToBene: {
      // '@': {
      //   'xsi:type' : 'xsd:string'
      // },
      '#': payload.altBeneRelToBene ? payload.altBeneRelToBene : ''
    },
    messageToBene: {
      // '@': {
      //   'xsi:type' : 'xsd:string'
      // },
      '#': payload.messageToBene ? payload.messageToBene : ''
    },
    receiverCorrBank: {
      // '@': {
      //   'xsi:type' : 'xsd:string'
      // },
      '#': payload.receiverCorrBank ? payload.receiverCorrBank : ''
    },
    senderCorrBank: {
      // '@': {
      //   'xsi:type' : 'xsd:string'
      // },
      '#': payload.senderCorrBank ? payload.senderCorrBank : ''
    },
    sendingBank: {
      // '@': {
      //   'xsi:type' : 'xsd:string'
      // },
      '#': payload.sendingBank ? payload.sendingBank : ''
    },
    receivingBank: {
      // '@': {
      //   'xsi:type' : 'xsd:string'
      // },
      '#': payload.receivingBank ? payload.receivingBank : ''
    },
    modeOfCharge: {
      // '@': {
      //   'xsi:type' : 'xsd:string'
      // },
      '#': payload.modeOfCharge ? payload.modeOfCharge : ''
    },
    purposeCode: {
      // '@': {
      //   'xsi:type' : 'xsd:string'
      // },
      '#': payload.purposeCode ? payload.purposeCode : ''
    },
    individualCode: {
      // '@': {
      //   'xsi:type' : 'xsd:string'
      // },
      '#': payload.individualCode ? payload.individualCode : ''
    }
  };
  return xmlparser.parse('args1', args1, { declaration: { include: false } });
};

module.exports = {
  parseCBPayload,
  parseCBAuth
};



