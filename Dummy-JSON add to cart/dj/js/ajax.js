let Url = "https://dummyjson.com/products";

function getData() {
    let out;
    $.ajax({
        type: "get",
        url: Url,
        data: "contentType",
        dataType: "json",
        success: function (response) {
            $.each(response.products, function (key, val) { 
                 out += `<tr>
                    <td>${val.id}</td>
                    <td>${val.title}</td>
                    <td>${val.description}</td>
                    <td>
                    <button type="button" class="btn btn-warning" id="cart" value="${val.id}">Cart</button>
                    </td>
                </tr>`
            });
            $('#tbody').html(out);
        }
    });
}
document.querySelector("#get").addEventListener('click', getData);

function showData() {
    let out = "<h1>Pilih Kategori</h1>";
    $.ajax({
        type: "get",
        url: Url+"/categories",
        cache: false,
        data: "contentType",
        dataType: "json",
        success: function (response) {
            $.each(response, function (key, val) { 
                out += `<button class='btn btn-dark m-1 ' id="filter" value="${val}">#${val}</button>`;
            });
            $('#isi').html(out);
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
                    <button class="btn btn-info" id="update" data-bs-toggle="modal" data-bs-target="#exampleModal" value="${val.id}">UPDATE</button>
                </td>
                <td>
                    <button class="btn btn-primary" id="delete" value="${val.id}">DELETE</button>
                </td>
                </tr>
                </tr>`;
            });
            $('#tbody').html(out);
        }
    });      
}

function form(id) {
    let out = '<option selected>Pilih</option>';
    if (id) {
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
                $('#cat').html(out);
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

    $.ajax({
        type: "POST",
        url: Url+"/add",
        data: JSON.stringify({
            title: data['title'],
            description: data['description'],
            category: data['category'],
        }),
        contentType: "application./json",
        success: function (response) {
            console.log(response);
            alert(data['title'] + " Added");
        }
    });
}

$("#save").click(function (e) { 
    e.preventDefault();
    id = $("#id").val();
    title = $("#title").val();
    description = $("#des").val();
    category = $("#cat").val();

    if (id) {
        updateData(id)
    }
    else {
        addData()
    }
    
});

function selectUpdateData(id) {
    $.ajax({
        type: "get",
        url: Url+"/"+id,
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
    $.ajax({
        method: "patch",
        url: Url+"/"+id,
        contentType: "application/json",
        data:  JSON.stringify({
            title: data["title"],
            description: data["description"],
            category: data["category"]
            }),
        success: function (response) {
            console.log(response)
            console.log(data);
            alert(data["title"] + " Updated")
        }
    });
}

$(document).on("click", "#btn-update", function (e) { 
    let id = $(this).attr("data-id");
    $("#exampleModalLabel").html("update data");
    form();
    selectUpdateData(id);
    
});

function deleteData(id) {
    $.ajax({
        type: "DELETE",
        url: Url+"/"+id,
        success: function (response) {
            console.log(response)
            alert("Deleted");
        }
    });
}

$(document).on("click", "#btn-delete", function (e) { 
    let id = $(this).attr("data-id");
    deleteData(id);
    
});

function cartData(id) {
    out="";
    $.ajax({
        type: "GET",
        url: `https://dummyjson.com/products/${id}`,
        data: "contentType",
        data: "json",
        success: function (response) {
            let out = `<table class="table mt-2"><thead>
                <tr>
                    <th>Id</th>
                    <th>Title</th>
                    <th>Price</th>
                    <th>Pembeli</th>
                </tr>
            </thead></table>`
            out += `
                <tr>
                    <td>${response.id}</td>
                    <td>${response.title}</td>
                    <td>${response.price}</td>
                    <td id="data-custom"></td>
                </tr>
                
                <tr>
                    <td>
                        <button type="button" class="btn btn-outline-danger">Tambah Order</button>
                    </td>
                </tr>`;

            $("#dummy").html(out);
        }
    });
}

$(document).on("click", "#cart", function () {
    let id = $(this).attr("value");
    cartData(id);
});


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

$(document).on("click", "#filter", function (e) {
    let cat = $(this).attr("value");
    filterData(cat)
})

$(document).on("click", "#cart", function (e) {
    let id = $(this).attr("value");
    cartData(id);
})

// PELANGGAN 

function getDatapelanggan() {
    $.ajax({
        type: "get",
        url: "http://localhost/php/get.php",
        cache: false,
        dataType: "json",
        success: function (response) {
            let out = `<thead><tr>
            <th>Nama</th>
            <th>Alamat</th>
            <th>Telp</th>
            </tr></thead>`;
            $.each(response, function (key, val) {
                out += `
                <tr>
                    <td>${val.pelanggan}</td>
                    <td>${val.alamat}</td>
                    <td>${val.telp}</td>
                    <td>
                    <button type="button" id="btn-updatepelanggan" class="btn btn-outline-warning" value="${val.idpelanggan}">Update</button>
                    <button type="button" id="btn-deletepelanggan" class="btn btn-outline-danger" value="${val.idpelanggan}">Delete</button>
                    <button type="button" id="btn-cartpelanggan" class="btn btn-outline-secondary" value="${val.idpelanggan}">Cart</button>
                    </td>
                 </tr>`;
            });
            $("#table-cust").html(out);
        }
    });
}

$("#get-pelanggan").click(function (e) {
    e.preventDefault();
    getDatapelanggan();
});

function cartPelanggan(id){
    out="";
    $.ajax({
        type: "get",
        url: "http://localhost/php/selectwhere.php?id=" + id,
        data: "contentType",
        dataType: "json",
        success: function (response) {
            // console.log(response.pelanggan)
            out +=`
            <table class="table">
            <tr>

            </tr>
            <td>${response.idpelanggan}</td>
            <td>${response.pelanggan}</td>
            <td>${response.alamat}</td>
            </table>
            `;
            $("#data-pelanggan").html(out);
        }
    });
}

    $(document).on("click", "#btn-cartpelanggan" , function () {
        let id = $(this).attr("value");
        cartPelanggan(id);
    });

function formpelanggan() {
    let out = `
    <input class="form-control" type="text" id="id" hidden>

    <label class="form-label mt-4">Name</label>
    <input class="form-control" type="text" id="pelanggan">

    <label class="form-label mt-4">Alamat</label>
    <input class="form-control" type="text" id="alamat">

    <label class="form-label mt-4">Telp</label>
    <input class="form-control" type="text" id="telp">

    <input class="btn btn-outline-primary mt-4" type="submit" id="submit-pel" value="Save">`;
    $("#isi-cust").html(out);
}

$("#post-pelanggan").click(function (e) {
    e.preventDefault();
    formpelanggan();
});

function addDatapelanggan() {
    let dataPelanggan = {
        pelanggan: pelanggan,
        alamat: alamat,
        telp: telp
    }
    $.ajax({
        type: "post",
        url: "http://localhost/php/add.php",
        cache: false,
        data: JSON.stringify(dataPelanggan),
        success: function (response) {
            alert(response);
        }
    });
}

function selectUpdatepelanggan(id) {
    let idpelanggan = {
        idpelanggan: id
    }
    $.ajax({
        type: "post",
        url: "http://localhost/php/selectupdate.php",
        cache: false,
        data: JSON.stringify(idpelanggan),
        success: function (response) {

            let data = JSON.parse(response)

            $("#id").val(data.idpelanggan);
            $("#pelanggan").val(data.pelanggan);
            $("#alamat").val(data.alamat);
            $("#telp").val(data.telp);
        }
    });
}

function updateDatapelanggan(id) {
    let data = {
        idpelanggan: id,
        pelanggan: pelanggan,
        alamat: alamat,
        telp: telp
    };
    $.ajax({
        type: "post",
        url: "http://localhost/php/update.php",
        cache: false,
        data: JSON.stringify(data),
        dataType: "dataType",
        success: function (response) {
            alert(response);
        }
    });
}

$(document).on("click", "#btn-updatepelanggan", function () {
    let id = $(this).attr("value");
    formpelanggan();
    selectUpdatepelanggan(id);
    // alert(id);
});

$(document).on("click", "#submit-pel", function () {
    id = $("#id").val();
    pelanggan = $("#pelanggan").val();
    alamat = $("#alamat").val();
    telp = $("#telp").val();

    if (id) {
        updateDatapelanggan(id);
    } else {
        addDatapelanggan();
    }

});

function deleteDatapelanggan(id) {
    let idpelanggan = {
        idpelanggan: id
    }

    $.ajax({
        type: "post",
        url: "http://localhost/php/delete.php",
        cache: false,
        data: JSON.stringify(idpelanggan),
        // dataType: "dataType",
        success: function (response) {
            alert(response)
        }
    });
}

$(document).on("click", "#btn-deletepelanggan", function () {
    let id = $(this).attr("value");
    deleteDatapelanggan(id);
});