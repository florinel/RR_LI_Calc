"use strict";

// VARIABLES -----------------------

const partials = ["ci1", "ci2", "vf1", "vf2", "vf3", "ti1", "ti2", "bi1", "bi2", "bi3"];

var LS = 0;
var IS = 0;


function calculate() {

  var dataset = [];
  var score = '';
  var MS = '';
  var risk = '';
  deleteClass();
  // get the residual risk cell in the table
  var residualRiskCell = document.getElementById("residualRiskCell");


  // Get values CONFIDENTIALITY AND INTEGRITY (CI) and VULNERABILITY FACTORS (VF)
  LS = + $("#ci1").val() +
    + $("#ci2").val() +
    + $("#vf1").val() +
    + $("#vf2").val() +
    + $("#vf3").val() + 0;


  // Get values TECHNICAL IMPACT (TI) )and BUSINESS IMPACT (BI))
  IS = + $("#ti1").val() +
    + $("#ti2").val() +
    + $("#bi1").val() +
    + $("#bi2").val() +
    + $("#bi3").val() + 0;


  //var LS = (LS / 5).toFixed(3);
  //var IS = (IS / 5).toFixed(3);

  console.log("LS is " + LS);
  console.log("IS is " + IS);

  var FLS = getRisk(LS);
  var FIS = getRisk(IS);

  console.log("FLS is " + FLS);
  console.log("FIS is " + FIS);

  $(".LS").text(LS + " " + FLS);
  $(".IS").text(IS + " " + FIS);

  score = LS * IS;
  console.log("score is " + score);


  if (getRisk(LS) == "INFO") {
    $(".LS").addClass("classInfo");
  } else if (getRisk(LS) == "LOW") {
    $(".LS").addClass("classLow");
  } else if (getRisk(LS) == "MEDIUM") {
    $(".LS").addClass("classMedium");
  } else if (getRisk(LS) == "HIGH") {
    $(".LS").addClass("classHigh");
  } else {
    $(".LS").addClass("classVeryHigh");
  }

  risk = getRisk(LS);
  $(".likelihood" + risk).addClass("selectedRisk");
  MS = $(".likelihood" + risk).parent();


  if (getRisk(IS) == "INFO") {
    $(".IS").addClass("classInfo");
  } else if (getRisk(IS) == "LOW") {
    $(".IS").addClass("classLow");
  } else if (getRisk(IS) == "MEDIUM") {
    $(".IS").addClass("classMedium");
  } else if (getRisk(IS) == "High") {
    $(".IS").addClass("classHigh");
  } else {
    $(".IS").addClass("classVeryHigh");
  }

  risk = getRisk(IS);

  $(".impact" + risk).addClass("selectedRisk");

  console.log("LikelihoodRisk LS is " + FLS);
  console.log("ImpactRisk is " + FIS);

  var no = 0;
  if (risk == 'INFO') no = 0;
  if (risk == 'LOW') no = 1;
  if (risk == 'MEDIUM') no = 2;
  if (risk == 'HIGH') no = 3;
  if (risk == 'VERY HIGH') no = 3;

  $(".row").children().removeClass("cMainScore")
  $(MS).children().eq(no).addClass("cMainScore")

  //FINAL
  var RS = getCriticaly(FLS, FIS);
  if (RS == "INFO") {
    $(".RS").text(RS);
    $(".RS").addClass("classInfo");
  } else if (RS == "LOW") {
    $(".RS").text(RS);
    $(".RS").addClass("classLow");
  } else if (RS == "MEDIUM") {
    $(".RS").text(RS);
    $(".RS").addClass("classMedium");
  } else if (RS == "HIGH") {
    $(".RS").text(RS);
    $(".RS").addClass("classHigh");
  } else if (RS == "VERY HIGH") {
    $(".RS").text(RS);
    $(".RS").addClass("classVeryHigh");
  }

  console.log("Residual Risk is " + RS);

}



function getRisk(score) {
  if (score == 0) return 'INFO';
  if (score == 1) return 'LOW';
  if (score == 2) return 'MEDIUM';
  if (score == 3) return 'HIGH';
  if (score == 4) return 'VERY HIGH';
  if (score == 5) return 'VERY HIGH';
}

// Calculate final Risk Severity
function getCriticaly(L, I) {
  //INFO
  if (L == "LOW" && I == "INFO") return 'INFO';
  if (L == "INFO" && I == "LOW") return 'INFO';
  if (L == "INFO" && I == "MEDIUM") return 'INFO';
  if (L == "MEDIUM" && I == "INFO") return 'INFO';
  if (L == "INFO" && I == "HIGH") return 'INFO';
  if (L == "HIGH" && I == "INFO") return 'INFO';
  if (L == "INFO" && I == "VERY HIGH") return 'INFO';
  if (L == "VERY HIGH" && I == "INFO") return 'INFO';

  //LOW
  if (L == "LOW" && I == "LOW") return 'LOW';
  if (L == "LOW" && I == "MEDIUM") return 'LOW';
  if (L == "MEDIUM" && I == "LOW") return 'LOW';


  //MEDIUM
  if (L == "LOW" && I == "HIGH") return 'MEDIUM';
  if (L == "MEDIUM" && I == "MEDIUM") return 'MEDIUM';
  if (L == "HIGH" && I == "LOW") return 'MEDIUM';



  //HIGH
  if (L == "HIGH" && I == "MEDIUM") return 'HIGH';
  if (L == "MEDIUM" && I == "HIGH") return 'HIGH';
  if (L == "VERY HIGH" && I == "MEDIUM") return 'HIGH';
  if (L == "MEDIUM" && I == "VERY HIGH") return 'HIGH';
  if (L == "LOW" && I == "VERY HIGH") return 'HIGH';
  if (L == "VERY HIGH" && I == "LOW") return 'HIGH';

  //VERY HIGH
  if (L == "HIGH" && I == "HIGH") return 'VERY HIGH';
  if (L == "VERY HIGH" && I == "HIGH") return 'VERY HIGH';
  if (L == "HIGH" && I == "VERY HIGH") return 'VERY HIGH';
  if (L == "VERY HIGH" && I == "VERY HIGH") return 'VERY HIGH';
}




// Delete class before of calculate
function deleteClass() {
  // Delete Class Likelihood Score
  $(".LS").removeClass("classInfo");
  $(".LS").removeClass("classLow");
  $(".LS").removeClass("classMedium");
  $(".LS").removeClass("classHigh");
  $(".LS").removeClass("classVeryHigh");

  // Delete Class Impact Score
  $(".IS").removeClass("classInfo");
  $(".IS").removeClass("classLow");
  $(".IS").removeClass("classMedium");
  $(".IS").removeClass("classHigh");
  $(".IS").removeClass("classVeryHigh");

  // Delete Class Risk Severity
  $(".RS").removeClass("classInfo");
  $(".RS").removeClass("classLow");
  $(".RS").removeClass("classMedium");
  $(".RS").removeClass("classHigh");
  $(".RS").removeClass("classVeryHigh");
}