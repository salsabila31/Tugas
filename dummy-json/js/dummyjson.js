let Url = "https://dummyjson.com/products";

function getData() {
    let out;
    $.ajax({
        type: "get",
        url: Url,
        cache: false,
        data: "contentType",
        dataType: "json",
        success: function (response) {
            $.each(response.products, function (key, val) { 
                out += `<tr>
                <td>${val.id}</td>
                <td>${val.title}</td>
                <td>${val.description}</td>
                <td>
                    <button type="button" class="btn btn-outline-secondary" id="update" data-bs-target="#exampleModal" value="${val.id}">Update</button>
                </td>
                <td>
                    <button type="button" class="btn btn-outline-dark" id="delete" value="${val.id}">Delete</button>
                </td>
                </tr>`;
            });
            $("#tbody").html(out);
        }
    });
}
function showData() {
    let out = "<h1>Chose a Category</h1>";
    $.ajax({
        type: "get",
        url: Url+"/categories",
        cache: false,
        data: "contentType",
        dataType: "json",
        success: function (response) {
            $.each(response, function (key, val) { 
                out += `<button class='btn btn-outline-dark m-1 ' id="filter" value="${val}">#${val}</button>`;
            });
            $("#isi").html(out);
        }
    });
}

function filterData(Cat) {
    let out;
    $.ajax({
        type: "get",
        url: Url+"/category/"+Cat,
        cache: false,
        data: "contentType",
        dataType: "json",
        success: function (response) {
            $.each(response.products, function (key, val) { 
                out += `<tr>
                <td>${val.id}</td>
                <td>${val.title}</td>
                <td>${val.description}</td>
                <td>
                    <button type="button" class="btn btn-outline-secondary" id="update" data-bs-target="#exampleModal" value="${val.id}">Update</button>
                </td>
                <td>
                    <button type="button" class="btn btn-outline-dark" id="delete" value="${val.id}">Delete</button>
                </td>
                </tr>
                </tr>`;
            });
            $("#tbody").html(out);
        }
    });      
}

function form(id) {
    let out = '<option selected>Choose...</option>';
    if (id != null) {
        $.ajax({
            type: "get",
            url: Url+"/"+id,
            data: "contentType",
            dataType: "json",
            success: function (response) {
                var cat = response.category;
                $.ajax({
                    type: "get",
                    url: Url+"/categories",
                    cache: false,
                    data: "contentType",
                    dataType: "json",
                    success: function (response) {
                        $.each(response, function (key, val) { 
                                if (cat == val) {
                                    out += `<option value="${val}" selected >${val}</option>`;
                                } else{
                                    out += `<option value="${val}">${val}</option>`;
                                }
                        });
                        $("#cat").html(out);
                    }
                });
            }
        });
    } else {
        $.ajax({
            type: "get",
            url: Url+"/categories",
            cache: false,
            data: "contentType",
            dataType: "json",
            success: function (response) {
                $.each(response, function (key, val) { 
                        out += `<option value="${val}">${val}</option>`;
                });
                $("#cat").html(out);
            }
        });
    }
}

function addData() {
    let data ={
        title: title, 
        description: description,
        category: category,
    };
    fetch(Url+"/add", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            title: data["title"],
            description: data['description'],
            category: data["category"]
          /* other product data */
        })
    })
    .then(res => res.json())
    .then(console.log)
    .then(alert(data["title"] + " Added"))
}

function selectUpdateData(id) {
    $.ajax({
        type: "get",
        url: Url+"/"+id,
        cache: false,
        data: "contentType",
        dataType: "json",
        success: function (response) {

            $("#id").val(response.id);
            $("#title").val(response.title);
            $("#des").val(response.description);
            $("#cat").val(response.category);

        }
    });
    
}

function updateData(id) {
    let data = {
        title: title,
        description: description,
        category: category,
    }
    fetch(Url+"/"+id, {
        method: 'PATCH', /* or PATCH */
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            title: data["title"],
            description: data["description"],
            category: data["category"]
        })
    })
    .then(res => res.json())
    .then(console.log)
    .then(alert(data["title"] + " Updated"))

}

function deleteData(id) {
    fetch(Url+"/"+id, {
    method: 'DELETE',
    })
    .then(res => res.json())
    .then(console.log)
    .then(alert("Deleted"));
}

$("#get").click(function (e) { 
    e.preventDefault();
    getData();
});

$("#show").click(function (e) { 
    e.preventDefault();
    showData();
});

$("#post").click(function (e) { 
    e.preventDefault();
    form();
});

$("#delete").click(function (e) { 
    e.preventDefault();
    alert("DELETE");
});

$("#save").click(function (e) { 
    e.preventDefault();
    id = $("#id").val();
    title = $("#title").val();
    description = $("#des").val();
    category = $("#cat").val();

    if (id != null) {
        updateData(id);
    } else {
        addData()
    }
});


$(document).on("click", "#filter", function (e) {
    let cat = $(this).attr("value");
    filterData(cat)
})

$(document).on("click", "#update", function (e) {
    let id =  $(this).attr("value");
    form(id);
    selectUpdateData(id);
})
$(document).on("click", "#delete", function (e) {
    let id = $(this).attr("value");
    deleteData(id);
})

getData();