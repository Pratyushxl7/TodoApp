$("ul").on("click", "li", function()
{
    $(this).toggleClass("completed");
});

//Check off specific Todos by clicking
$("ul").on("click", "span", function()
{   
	var itemtoremove=$(this).parent().text();
	$.post('/remove', {itemtoremove:itemtoremove});
    $(this).parent().fadeOut(500, function(){$(this).remove();});
    event.stopPropagation();
	
});

var no_of_tasks=0;


//Add task soon as enter is pressed
$("input[type='text']").on("keypress", function(key_info)
{
    if(key_info.which===13)
    {
        if($(this).val().replace(/ /g,'')!=="")
        {
            //grabbing new todo text from input
            var todotext=$(this).val();
			$(this).val(""); //Clear the text input
			$.post('/add', {newTask:todotext});
			$("ul").append("<li><span><i class=\"fa fa-trash\"></i></span> "+todotext+"</li>");
		}
		
        else
        {
            alert("A task can not be empty!");
        }
    }
}
);


//Show and hide the input text field
$(".fa-plus").click(function()
{
    $("input[type='text']").slideToggle();
});