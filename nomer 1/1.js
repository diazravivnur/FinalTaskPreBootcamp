// Buatlah sebuah function yang bertujuan untuk menghitung harga barang berdasarkan kualitasnya, dengan parameter kualitas barang dan quantity :
// Kentuan : 
// Kualitas Barang A, Harga 4550, Jika Qty Pembelian diatas 13 mendapat potongan 231/qty
// Kualitas Barang B, Harga 5330, Jika Qty pembelian diatas 7 akan mendapatkan potongan 23%
// Kualitas Barang C, Harga 8653, Tidak ada promo untuk barang ini

// Clue : maka jika function dijalankan :
// Hitungbarang(A, 14)
// Output :  - Total harga barang : 63700
//    - Potongan : 3234
//    - Total yang harus dibayar : 60466

// FLOW CODE :
// 1. Input Barang
// 2. Input Jumlah Barang
// 3. Decisions : 
//      if A, harga 4550, diskon 231 per jumlah item
//      if B, harga 5330, diskon 7 persen
//      if C, harga 8653, tidak ada promo
// 4. output :
//      Harga barang :
//      Potongan :
//      Total yang harus dibayar :

const inputItem = prompt("masukkan kualitas Barang : ex A, B, C")

const inputItemValue = parseInt(prompt("masukkan jumlah barang : "))

var price = ""
var discount = ""
var total = ""

if ( inputItem === "A"){
    if (inputItemValue < 13){
        price = inputItemValue * 4550
        discount = "tidak ada discount"
        total = price
    }else{
        price = inputItemValue * 4550
        discount = inputItemValue * 231
        total = price - discount
    }
    document.write(
        "harga barang : " + price + "</br>" +
        "discount : " + discount + "</br>" +
        "total yang harus dibayar : " + total
    )
} else if ( inputItem === "B"){
    if (inputItemValue < 7){
        price = inputItemValue * 5330
        discount = "tidak ada discount"
        total = price
    }else{
        price = inputItemValue * 5330
        discount = (inputItemValue * 5330) * (23/100)
        total = price - discount
    }
    document.write(
        "harga barang : " + price + "</br>" +
        "discount : " + discount + "</br>" +
        "total yang harus dibayar : " + total
    )
} else if ( inputItem === "C"){
    price = inputItemValue * 8653
    discount = "tidak ada discount"
    total = price
    document.write(
        "harga barang : " + price + "</br>" +
        "discount : " + discount + "</br>" +
        "total yang harus dibayar : " + total
    )
} else {
    document.write("INPUT YANG ANDA MASUKKAN SALAH")
}