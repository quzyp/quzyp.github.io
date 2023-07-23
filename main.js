$( document ).ready(function() {
    var inputbox = '<input type="text" size="1" maxlength="1" class="empty">'
    $("#userinput").append(inputbox);
    $("#userinput").append(inputbox); 
    $("#userinput").append(inputbox); 
    $("#userinput").append(inputbox);
    $("#userinput").append(inputbox); 

$("input").keyup(function () {
    if (this.value.length == this.maxLength) {
      $(this).next('input').focus();
      $(this).next('input').select();
    }
     	
    $( "input" ).each(function( index ) {
        if ($(this).val().length > 0) {
            $(this).attr('class', 'filled');
        }
        else {
            $(this).attr('class', 'empty');
        }
    });
});

});