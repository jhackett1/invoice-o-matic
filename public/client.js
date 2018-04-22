// Add a new invoicable item to the form
function addNewItem(){
  let invoiceItemsTable = document.getElementById('invoice-items');
  let numberOfItems = invoiceItemsTable.rows.length-1;
  let newRow = document.createElement("tr");
  newRow.innerHTML = `
    <td><input type="text" name="items[${numberOfItems}][name]" required></input></td>
    <td><input type="text" name="items[${numberOfItems}][description]" required></input></td>
    <td><input type="number" min="1" value="1" class="quantity" name="items[${numberOfItems}][quantity]" onChange="updateTotal()" required></input></td>
    <td><input type="number" min="1" class="unitCost" name="items[${numberOfItems}][unitCost]" onChange="updateTotal()" required></input></td>
  `;
  invoiceItemsTable.appendChild(newRow)
}

// When a quantity or unit cost field is changed
function updateTotal(){
  let unitCosts = document.querySelectorAll('input.unitCost');
  let quantities = document.querySelectorAll('input.quantity');
  let grandTotalGauge = document.querySelector('#invoice-items-total span');
  let grandTotal = 0;
  for (var i = 0; i < unitCosts.length; i++) {
    itemCost = unitCosts[i].value * quantities[i].value;
    grandTotal += itemCost;
  }
  grandTotalGauge.innerHTML = grandTotal;
}
