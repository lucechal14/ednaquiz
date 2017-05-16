$(document).ready(function(){
    console.log('Code loaded!');

    $('a#testPrint').click(function () {
    console.log('Printing...');
    console.log($(this).attr('href'));
    //$(this).attr('href')
    var w = window.open('http://localhost:3000/test');

    w.onload = function () {
        w.print();
    };

    return false;
});
});