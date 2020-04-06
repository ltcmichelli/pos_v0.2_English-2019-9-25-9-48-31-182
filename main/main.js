'use strict';

function printReceipt(inputs) {
  //console.log('Implement the exercise requirements here and rewrite the line of code.');
  var itemDetailList = decodeItem(inputs);
  var itemDetailWithTotalList = generateReceipt(itemDetailList);
}

function decodeItem(inputs) {
  var itemQuantityList = countItem(inputs);
  var itemDetailList = getItemDetail(itemQuantityList);
  console.log(itemDetailList)
  return itemDetailList;
}

function generateReceipt(itemDetailList) {
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
  var itemDetailList = [];
  var allItemList = loadAllItems();

  Object.keys(itemQuantityList).forEach(key => {
    Object.keys(allItemList).forEach(index => {
      if (itemQuantityList[key].barcode == allItemList[index].barcode) {
        itemDetailList.push({
          barcode: itemQuantityList[key].barcode,
          name: allItemList[index].name,
          unit: allItemList[index].unit,
          price: allItemList[index].price,
          quantity: itemQuantityList[key].quantity
        });
      }
    });
  });

  return itemDetailList;
}

function calculateItemPrice(itemDetailList) {
}

function calculateTotalPrice(inputs) {
  var itemDetailWithTotalList = [];

}

function renderReceipt(inputs) {

}
