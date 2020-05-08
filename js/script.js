$(document).ready(function () {
  var url = "http://csc225.mockable.io/books";
  var loading = $("<div>")
    .addClass("text-white mt-5 mt-md-0")
    .attr("id", "loading")
    .html("Loading ...");
  var currentBook;

  function createBookListItem(book) {
    return $("<li>")
      .addClass("list-group-item cursor-pointer hover")
      .data("bookId", book.id)
      .html(`${book.title} by ${book.author}`);
  }

  function createCardImage() {
    return $("<img>")
      .addClass("card-img-top card-img")
      .attr({ src: currentBook.cover, alt: currentBook.title });
  }

  function createMetaDataList() {
    var list = $("<ul>").addClass("list-group list-group-flush");
    var keys = ["pages", "year", "language", "country", "link"];
    keys.forEach(function (key) {
      list.append(createMetaDataListItem(key));
    });

    return list;
  }
  function createMetaDataListItem(key) {
    var listItem = $("<div>").addClass("list-group-item");
    if (key === "link") {
      var link = $("<a>")
        .attr({ href: currentBook.link, target: "_blank" })
        .addClass("btn btn-primary")
        .html("Wikipedia");
      listItem.append(link);
    } else {
      listItem.html(
        `${key.charAt(0).toUpperCase() + key.substring(1)}: ${currentBook[key]}`
      );
    }
    return listItem;
  }

  function createCardBody() {
    var cardBody = $("<div>").addClass("card-body");
    var title = $("<h5>").addClass("card-title").html(currentBook.title);
    var subTitle = $("<h6>")
      .addClass("card-subtitle")
      .html(`By: ${currentBook.author}`);
    var list = createMetaDataList();
    cardBody.append([title, subTitle, list]);
    return cardBody;
  }
  function createCard() {
    var card = $("<div>")
      .addClass("card mt-5 mt-md-0 mb-5 mx-auto text-center")
      .css("width", "18rem");
    var image = createCardImage();
    var cardBody = createCardBody();
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
      }).done(function (data) {
        loading.remove();
        currentBook = data;
        $("#book-info").append(createCard());
      });
    });
  });
});
