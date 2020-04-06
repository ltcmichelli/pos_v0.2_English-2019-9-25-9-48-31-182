'use strict';

function printReceipt(inputs) {
  //console.log('Implement the exercise requirements here and rewrite the line of code.');
  var itemDetailList = decodeItem(inputs);
  var itemDetailWithTotalList = generateReceipt(itemDetailList);
  renderReceipt(itemDetailWithTotalList);
}

function decodeItem(inputs) {
  var itemQuantityList = countItem(inputs);
  var itemDetailList = getItemDetail(itemQuantityList);
  return itemDetailList;
}

function generateReceipt(itemDetailList) {
  var itemDetailWithSubtotalList = calculateItemPrice(itemDetailList);
  var itemDetailWithTotalList = calculateTotalPrice(itemDetailWithSubtotalList);
  return itemDetailWithTotalList;
}

function renderReceipt(inputs) {

}

function countItem(inputs) {
  var itemQuantityList = [];
  var key = inputs[0];
  var qty = 0;


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
  var allItemList = loadAllItems();

  Object.keys(itemQuantityList).forEach(key => {
    Object.keys(allItemList).forEach(index => {
      if (itemQuantityList[key].barcode == allItemList[index].barcode) {
        itemQuantityList[key].name = allItemList[index].name;
        itemQuantityList[key].unit =  allItemList[index].unit;
        itemQuantityList[key].price = allItemList[index].price;
      }
    });
  });

  return itemQuantityList;
}

function calculateItemPrice(itemDetailList) {
    Object.keys(itemDetailList).forEach(index => {
      itemDetailList[index].subtotal = itemDetailList[index].price * itemDetailList[index].quantity;
  });
  return itemDetailList
}

function calculateTotalPrice(itemDetailWithSubtotalList) {
  var total = 0;
  Object.keys(itemDetailWithSubtotalList).forEach(index => {
    total += itemDetailWithSubtotalList[index].subtotal;
  });
  itemDetailWithSubtotalList.total = total
  return itemDetailWithSubtotalList;
}

