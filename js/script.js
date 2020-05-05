var url = "http://csc225.mockable.io/books";

$(document).ready(function () {
  $.ajax({
    type: "GET",
    url,
    beforeSend: function () {
      $("#loading").show();
    },
  }).done(function (data) {
    $("#loading").hide();
    data.forEach((book) => {
      var button = $("<button></button>")
        .addClass("btn book btn-light mx-3 my-3 w-25")
        .attr("id", book.id)

        .html(`${book.title} by ${book.author}`);
      $("#book-list").append(button);
    });

    $(".btn").click(function () {
      $.ajax({
        type: "GET",
        url: `${url}/${this.id}`,
        beforeSend: function () {
          $(".card").remove();
          $("#loading").show();
        },
      }).done(function (data) {
        $("#loading").hide();
        var card = $("<div></div>")
          .addClass("card mb-5 mx-auto text-center")
          .css("width", "18rem");
        var image = $("<img>")
          .addClass("card-img-top")
          .attr({ src: data.cover, alt: data.title });

        var cardBody = $("<div></div>").addClass("card-body");
        var title = $("<h5></h5>").addClass("card-title").html(data.title);
        var subTitle = $("<h6></h6>")
          .addClass("card-subtitle")
          .html(`By: ${data.author}`);
        var list = $("<ul></ul>").addClass("list-group list-group-flush");
        var keys = ["pages", "year", "language", "country", "link"];
        keys.forEach(function (key) {
          var listItem = $("<div></div>").addClass("list-group-item");
          if (key === "link") {
            var link = $("<a></a>")
              .attr({ href: data.link, target: "_blank" })
              .addClass("btn btn-primary")
              .html("Wikipedia");
            listItem.append(link);
          } else {
            listItem.html(
              `${key.charAt(0).toUpperCase() + key.substring(1)}: ${data[key]}`
            );
          }
          list.append(listItem);
        });
        cardBody.append([title, subTitle, list]);
        card.append([image, cardBody]);
        $("body").append(card);
      });
    });
  });
});
