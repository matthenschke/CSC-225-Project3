$(document).ready(function () {
  var url = "http://csc225.mockable.io/books";
  var loading = $("<div>")
    .addClass("text-white mt-5 mt-md-0")
    .attr("id", "loading")
    .html("Loading ...");

  function createBookListItem(book) {
    return $("<li>")
      .addClass("list-group-item cursor-pointer hover")
      .data("bookId", book.id)
      .html(`${book.title} by ${book.author}`);
  }

  function createCardImage(src, alt) {
    return $("<img>").addClass("card-img-top card-img").attr({ src, alt });
  }

  function createCardBody() {}
  function createBookInfoCard(book) {
    var card = $("<div>")
      .addClass("card mt-5 mt-md-0 mb-5 mx-auto text-center")
      .css("width", "18rem");
    var image = createCardImage(book.cover, book.title);

    var cardBody = $("<div>").addClass("card-body");
    var title = $("<h5>").addClass("card-title").html(book.title);
    var subTitle = $("<h6>")
      .addClass("card-subtitle")
      .html(`By: ${book.author}`);
    var list = $("<ul>").addClass("list-group list-group-flush");
    var keys = ["pages", "year", "language", "country", "link"];
    keys.forEach(function (key) {
      var listItem = $("<div>").addClass("list-group-item");
      if (key === "link") {
        var link = $("<a>")
          .attr({ href: book.link, target: "_blank" })
          .addClass("btn btn-primary")
          .html("Wikipedia");
        listItem.append(link);
      } else {
        listItem.html(
          `${key.charAt(0).toUpperCase() + key.substring(1)}: ${book[key]}`
        );
      }
      list.append(listItem);
    });
    cardBody.append([title, subTitle, list]);
    card.append([image, cardBody]);
    return card;
  }

  $.ajax({
    type: "GET",
    url,
    beforeSend: function () {
      $("body").addClass("flex");
      $("body").append(loading);
    },
  }).done(function (data) {
    loading.remove();
    $("body").removeClass("flex");
    $("#main").removeClass("hidden");
    data.forEach((book) => {
      $("#book-list").append(createBookListItem(book));
    });

    $(".list-group-item").click(function () {
      $(".list-group-item").removeClass("active");
      $(this).addClass("active");
      $.ajax({
        type: "GET",
        url: url + "/" + $(this).data("bookId"),
        beforeSend: function () {
          $(".card").remove();
          $("#book-info").append(loading);
        },
      }).done(function (book) {
        loading.remove();
        $("#book-info").append(createBookInfoCard(book));
      });
    });
  });
});
