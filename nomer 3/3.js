for (var i=1 ; i<=5 ; i++){
    for (var j=1 ; j<=5 ; j++){
        if (i % 2 != 0 ){
            document.write("#")
        }else if( j % 2 != 0){
            document.write("#")
        }else if (j == 2 ){
            document.write("%")
        }else if (j == 2 ){
            document.write("%")
        }else {
            document.write("*")
        }
    } document.write("</br>")
}

