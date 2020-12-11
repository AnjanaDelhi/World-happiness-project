//function buildPlot() {
  /* data route */
  //   const url = "/api/country";
  //   d3.json(url).then(function(response) {

  //     console.log(response);

  //     const data = response;

  //     const layout = {
  //       scope: "usa",
  //       title: "World Happiness",
  //       showlegend: false,
  //       height: 600,
  //             // width: 980,
  //       geo: {
  //         scope: "usa",
  //         projection: {
  //           type: "albers usa"
  //         },
  //         showland: true,
  //         landcolor: "rgb(217, 217, 217)",
  //         subunitwidth: 1,
  //         countrywidth: 1,
  //         subunitcolor: "rgb(255,255,255)",
  //         countrycolor: "rgb(255,255,255)"
  //       }
  //     };

  //     Plotly.newPlot("plot", data, layout);
  //   });
  // }

  // buildPlot();

//life expectancy

function lifeExpectancy() {
  console.log("text");
  Plotly.d3.csv('WHR20_FinalData.csv', function(err, rows){
        console.log(rows);
        function unpack(rows, key) {
            return rows.map(function(row) { return row[key]; });
        }

      var data = [{
          type: 'choropleth',
          locationmode: 'country names',
          locations: unpack(rows, 'Country name'),
          z: unpack(rows, 'Healthy life expectancy'),
          text: unpack(rows, 'Country name'),
          autocolorscale: true
      }];
      console.log(data);

      var layout = {
        title: 'Healthy Life Expectancy',
        geo: {
            projection: {
                type: 'robinson'
            }
        }
      };

      Plotly.newPlot("lifemap", data, layout, {showLink: false});

  });
}
lifeExpectancy();
