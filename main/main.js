'use strict';

function printReceipt(inputs) {
  let itemDetailList = decodeItem(inputs);
  let itemDetailWithTotalList = generateReceipt(itemDetailList);
  renderReceipt(itemDetailWithTotalList);
}

function decodeItem(inputs) {
  let itemQuantityList = countItem(inputs);
  let itemDetailList = getItemDetail(itemQuantityList);
  return itemDetailList;
}

function generateReceipt(itemDetailList) {
  let itemDetailWithSubtotalList = calculateItemPrice(itemDetailList);
  let itemDetailWithTotalList = calculateTotalPrice(itemDetailWithSubtotalList);
  return itemDetailWithTotalList;
}

function renderReceipt(itemDetailWithTotalList) {
  let receipt = `***<store earning no money>Receipt ***\n`;
  itemDetailWithTotalList.forEach(item => {
    receipt += `Name：${item.name}，Quantity：${item.quantity} ${item.unit}${item.quantity === 1 ? '' : 's'}，Unit：${item.price} (yuan)，Subtotal：${item.subtotal} (yuan)\n`; 
  })
  receipt += `----------------------\n`+
  `总计：${itemDetailWithTotalList.total} (yuan)\n`+
`**********************`
console.log(receipt);
  return receipt;
}

function countItem(inputs) {
  let itemQuantityList = [];
  let key = inputs[0];
  let qty = 0;


  inputs.forEach(element => {
    if (element != key) {
      itemQuantityList.push({
        barcode: key,
        quantity: qty
      });
      key = element;
      qty = 1;
    } else {
      qty++;
    }
  });
  itemQuantityList.push({ barcode: key, quantity: qty });

  return itemQuantityList;
};


function getItemDetail(itemQuantityList) {
  let allItemList = loadAllItems();

  Object.keys(itemQuantityList).forEach(key => {
    Object.keys(allItemList).forEach(index => {
      if (itemQuantityList[key].barcode == allItemList[index].barcode) {
        itemQuantityList[key].name = allItemList[index].name;
        itemQuantityList[key].unit =  allItemList[index].unit;
        itemQuantityList[key].price = allItemList[index].price.toFixed(2);
      }
    });
  });
  return itemQuantityList;
}

function calculateItemPrice(itemDetailList) {
    Object.keys(itemDetailList).forEach(index => {
      itemDetailList[index].subtotal = (itemDetailList[index].price * itemDetailList[index].quantity).toFixed(2);
  });
  return itemDetailList
}

function calculateTotalPrice(itemDetailWithSubtotalList) {
  let total = 0;
  Object.keys(itemDetailWithSubtotalList).forEach(index => {
    total += parseInt(itemDetailWithSubtotalList[index].subtotal);
  });
  itemDetailWithSubtotalList.total = total.toFixed(2);

  return itemDetailWithSubtotalList;
}

