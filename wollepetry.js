$( document ).ready(function() {
    var solution = "lasiertesland"
    var lenAnswer = solution.length;
    var solved = false;

    var inputbox = '<input type="text" size="1" maxlength="1" class="empty">'
    $("#userinput").append(inputbox);
    $("#userinput").append(inputbox);
    $("#userinput").append(inputbox);
    $("#userinput").append(inputbox); 
    $("#userinput").append(inputbox);
    $("#userinput").append(inputbox); 
    $("#userinput").append(inputbox);
    $("#userinput").append(inputbox); 
    $("#userinput").append(inputbox);
    $("#userinput").append(inputbox); 
    $("#userinput").append(inputbox);
    $("#userinput").append(inputbox); 

    $("input[type=text]").each(function( index ) {
        if (index == 0) {
            $(this).focus();
            $(this).select(); 
        }
    });

    $("input").keyup(function () {
        var answer = ""

        if (this.value.length == this.maxLength) {
        $(this).next('input').focus();
        $(this).next('input').select();
        }
            
        $("input[type=text]").each(function( index ) {
            if ($(this).val().length > 0) {
                $(this).attr('class', 'filled');
                answer = answer + $(this).val();
            }
            else {
                $(this).attr('class', 'empty');
            }
        });
        
        if (answer.length == lenAnswer) {
            if (answer.toLowerCase() == solution) {
                solved = true;
                $("input[type=text]").each(function( index ) {
                    $(this).attr('class', 'solved');
                });      
                $(".next").removeAttr('hidden');
            };
        };
    });


    $(".reset").click(function() {
        $("input[type=text]").each(function( index ) {
            $(this).val("");
            $(this).attr('class', 'empty');
            if (index == 0) {
                $(this).focus();
                $(this).select(); 
            }
        });
    });

    $(".hint").click(function() {
        alert('Anagramm von A.S., zweites Wort ist "Land".');
    });

});