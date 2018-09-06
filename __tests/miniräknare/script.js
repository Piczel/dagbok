$("td").on("click", function() {
    
    
    switch($(this).text()) {
        case '=': 
        $("input").val(math.eval($("input").val()));
        break;
        case 'C':
        $("input").val("");
        break;
        case '<-':
        
            $("input").val($("input").val().substring(0, $("input").val().length-1));
            break;
        case '&radic;':
            $("input").val($("input").val()+"sqrt(");
            break;
        default:
            $("input").val($("input").val()+$(this).text());

    }
});

$("button").on("click", function() {
    $(".simple, .advanced").toggleClass("hidden");
});