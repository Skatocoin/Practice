var web3 = new Web3(Web3.givenProvider);
var contractInstance;

$(document).ready(function() {
    window.ethereum.enable().then(function(accounts){
      contractInstance = new web3.eth.Contract(window.abi, "0x8ae4981BB7f69cb66F6661218b4f44a0F07a1b6b", {from: accounts[0]});
    });
    $("#get_data_button").click(fetchAndDisplay);
    $("#add_data_button").click(inputData);

});

function inputData(){
  var name = $("#name_input").val();
  var age = $("#age_input").val();
  var height = $("#height_input").val();

  var config = {
   value: web3.utils.toWei("1", "ether")
 }

  contractInstance.methods.createPerson(name, age, height).send({value: web3.utils.toWei("1", "ether")})
    .on("transactionHash", function(hash){
      console.log(hash);
    })
    .on("confirmation", function(confirmationNr){
        console.log(confirmationNr);
    })
    .on("receipt", function(receipt){
      console.log(receipt);
    })
  }

  function fetchAndDisplay(){
    contractInstance.methods.getPerson().call().then(function(res){
      $("#name_output").test(res.name);
      $("#age_output").test(res.age);
      $("#height_output").test(res.height);
    })

    console.log(contractInstance.address)
  }
