let env_pillar_score = 0; 
let philanthropy_pillar_score = 0; 
let community_pillar_score = 0; 
let workplace_pillar_score = 0;
let env_text = "CSR Aware"
let philanthropy_text = "CSR Aware"
let community_text = "CSR Aware" 
let workplace_text = "CSR Aware";

function getValue(value){
    let returnValue = ""; 
    if (value === 0){
        returnValue = 'CSR Aware';
    }else if(value >=0 && value <10){
        returnValue = 'CSR Active';
    }else if(value >=10 && value < 18){
        returnValue = "CSR Proficient";
    }else if(value >=18){
        returnValue = "CSR Leader"
    }
    return returnValue;
}

const handle_pillars  = function(){
    let row = $(this).data('row')
    let pillar = $(this).data('pillar')
    let score = 0; 
    //handle no action disabling other actions 
    if($(this).hasClass(pillar+'-no-action')){
        $('.'+pillar+'-action-row-'+row).each(function(){
            this.checked = false
        });
    }else if($(this).hasClass(pillar+'-positive-action')){
        if(this.checked === true){
            $('.'+pillar+'-limit-action-'+row).each(function(){
                this.checked = true
            });
            
            $('.'+pillar+'-no-action-row-'+row).each(function(){
                this.checked = false;
            })
        }
    }else if($(this).hasClass(pillar+'-leading-action')){
        if(this.checked === true){
            $('.'+pillar+'-action-row-'+row).each(function(){
                this.checked = true
            });
            
            $('.'+pillar+'-no-action-row-'+row).each(function(){
                this.checked = false;
            })
        }
    }else if($(this).hasClass(pillar+'-action')){
        $('.'+pillar+'-no-action-row-'+row).each(function(){
            this.checked = false
        })
    }

    no_action_count = 0
    action_count = 0
    // get all the clicked no actions first 

    $('.'+pillar+'-no-action').each(function(){
        // console.log($(obj)[index].is(':checked'))
        if(this.checked === true){
            no_action_count += 1
        }
    });
    
    // get all the clicked actiions 
    $('.'+pillar+'-action').each(function(){
        if(this.checked === true){
            action_count += 1
        }
    });
    // uncheck the entire results first 
    $('.'+pillar+'-result').each(function(){
        this.checked = false; 
        $(this).attr('style','background-color: white; width: 25px; height: 25px;')
     });

     //store counters in temp value 
     let temp_no_action_count = no_action_count; 
     let temp_action_count = action_count;

    // represent answer in result 
    $('.'+pillar+'-result').each(function(){
       if(no_action_count > 0){
          // check element
          this.checked = true;
          // afterwards turn check to red
          $(this).attr('style','background-color: red; width: 25px; height: 25px;')
          // then decrement the count
          no_action_count -= 1
       }
       else if(action_count > 0){
        // check element
        this.checked = true;
        action_count -= 1
        $(this).attr('style','background-color: grey; width: 25px; height: 25px;')
       }
    });

    //set back counts
    no_action_count = temp_no_action_count; 
    action_count = temp_action_count;
    
    // represent answer in final result 
    $('.'+pillar+'-final-result').each(function(){
        // if(no_action_count > 0){
        //     // check element
        //     this.checked = true;
        //     // afterwards turn check to red
        //     $(this).attr('style','background-color: red; width: 25px; height: 25px;')
        //     // then decrement the count
        //     no_action_count -= 1
        // }
        if(action_count > 0){
            score = score + 1;
            // check element
            this.checked = true;
            action_count -= 1
            $(this).attr('style','background-color: grey; width: 25px; height: 25px;')
        }
     });
    //  alert('score for '+pillar+'= '+score)
     if(pillar === 'env'){
         env_pillar_score = score; 
         env_text = getValue(env_pillar_score)
     }else if(pillar === 'workplace'){
         workplace_pillar_score = score;
         workplace_text = getValue(workplace_pillar_score)
     }else if (pillar === 'philanthropic'){
         philanthropy_pillar_score = score; 
         philanthropy_text = getValue(philanthropy_pillar_score)
     }else if(pillar === 'community'){
         community_pillar_score = score; 
         community_text = getvalue(community_pillar_score)
     }
}

// apply function to all checkboxes 
$('.action').on('change', handle_pillars)

$('#submission-form').on('submit', (e)=>{
    e.preventDefault(); 
    sendEmail();
})
function sendEmail() {
    let userEmail = $('input[name="userEmail"]').val()
    let userName =  $('input[name="userName"]').val()
    let companyName =  $('input[name="companyName"]').val()

    let mailList = ['kole.audu@gmail.com']

    if(!userEmail){
        swal.fire("Email input cannot be empty")
    }

    else if(!/\S+@\S+\.\S+/.test(userEmail)){
        swal.fire("Email address is invalid")
    }

    else{
        mailList.push(userEmail);
        Email.send({
            Host : "smtp.gmail.com",
            Username : "csraccreditation@gmail.com",
            Password : "bulgpxbnklszzcsn",
            To : mailList,
            From :     "csraccreditation@gmail.com",
            Subject : "Roadmap Result",
            Body : `
            <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
    
        <title>HTML2PDF</title>
    
        <style type="text/css">
            body {
                font-family: Arial, Helvetica, sans-serif;
                font-size: large;
            }
            
            input {
                border-style: none;
            }
    
            #empty-container {
                background-color:  RGB(0,161,154) !important;
                height: 40px; 
                margin-top: 30px;
            }
        </style>
    </head>
    <body>
        <div id="element-to-print">
            <div class="container-fluid">
                <div id = "empty-container" style="background-color: #00a199; height: 40px; margin-top: 20px;">
    
                </div>
                <div class="container" style="padding: 5%; font-size: 135%">
                    <div style="display: flex; align-items: center; width: 100%;">
                        <h3 style="color: #00a199; font-size: 25px">
                            Thank you for completing 
                            <strong>The CSR Interactive Roadmap!</strong>
                        </h3>
                        <img src="https://csr-accreditation.co.uk/wp-content/uploads/2022/01/CSR-A_Logo-RGB.jpg" alt="" style="display: flex; height: 80px; width: 110px; margin-left: auto;">
                    </div>
                    <section style="background-color: #eaeaea; margin-top: 30px;">
                        <div class="container" style="display: flex;">
                            <label for="client-name" class="col-sm-2" style="color: #00a199; padding: 10px; margin-inline-start: 20px;">Results for:</label>
                            <div class="col-sm-8" style="margin-inline-start: 20px; padding: 10px;">
                                ${userName}, ${companyName}, <span style = "color: ;">${userEmail} </span>
                            </div>
                        </div>
                    </section>
                    <section style="background-color: #eaeaea;  margin-top: 20px;">
                        <div class="container">
                            <div style="display: flex;">
                                <h3 style="color: #00a199; margin-inline-start: 20px; padding: 10px; margin-left: 12px">
                                    ENVIRONMENT
                                </h3>
                                <img src="https://csr-accreditation.co.uk/wp-content/uploads/2022/01/ENV-ICON.png" alt="" srcset="" style="width: 100px; height: 100px; margin-left: auto; padding: 10px;">
                            </div>
                            <div>
                                <p style="color: #7f7e7d; padding-inline-start: 10px; padding-bottom: 20px; margin-inline-start: 20px; margin-left: 19px">
                                    You scored <span style="background-color: white;"> ${env_pillar_score}</span> from a possible <span style="background-color: white;"> 18</span>
                                    <br>
                                    <span style="color: #00A199"><b>This indicates you are ${env_text} involved in environmental CSR</b></span
                                </p>
                            </div>
                        </div>
                    </section>
                    <section style="background-color: #eaeaea;  margin-top: 20px;">
                        <div class="container">
                            <div style="display: flex;">
                                <h3 style="color: #00a199; margin-inline-start: 20px; padding: 10px; margin-left: 12px">
                                    WORKPLACE
                                </h3>
                                <img src="https://csr-accreditation.co.uk/wp-content/uploads/2022/01/WORK-ICON.png" alt="" srcset="" style="width: 100px; height: 100px; margin-left: auto; padding: 10px;">
                            </div>
                            <div>
                                <p style="color: #7f7e7d; padding-inline-start: 10px; padding-bottom: 20px; margin-inline-start: 20px; margin-left: 19px">
                                    You scored <span style="background-color: white;"> ${workplace_pillar_score}</span> from a possible <span style="background-color: white;"> 18</span>
                                    <br>
                                    <span style="color: #00A199"><b>This indicates you are ${workplace_text} involved in environmental CSR</b></span>
                                </p>
                            </div>
                        </div>
                    </section>
                    <section style=" background-color: #eaeaea; margin-top: 20px;">
                        <div class="container">
                            <div style="display: flex;">
                                <h3 style="color: #00a199; margin-inline-start: 20px; padding: 10px; margin-left: 12px" class="fs-4">
                                    COMMUNITY
                                </h3>
                                <img src="https://csr-accreditation.co.uk/wp-content/uploads/2022/01/COMM-ICON.png" alt="" srcset="" style="width: 100px; height: 100px; margin-left: auto; padding: 10px;">
                            </div>
                            <div>
                                <p style="color: #7f7e7d; padding-inline-start: 10px; padding-bottom: 20px; margin-inline-start: 20px; margin-left: 19px">
                                    You scored <span style="background-color: white;"> ${community_pillar_score}</span> from a possible <span style="background-color: white;"> 18</span>
                                    <br>
                                    <span style="color: #00A199"><b>This indicates you are ${community_text} involved in environmental CSR</b></span>
                                </p>
                            </div>
                        </div>
                    </section>
                    <section style="background-color: #eaeaea; margin-top: 20px;">
                        <div class="container">
                            <div style="display: flex;">
                                <h3 style="color: #00a199; margin-inline-start: 20px; padding: 10px; margin-left: 12px">
                                    PHILANTHROPY
                                </h3>
                                <img src="https://csr-accreditation.co.uk/wp-content/uploads/2022/01/PHIL-ICON.png" alt="" srcset="" style="width: 100px; height: 100px; margin-left: auto; padding: 10px;">
                            </div>
                            <div>
                                <p style="color: #7f7e7d; padding-inline-start: 10px; padding-bottom: 20px; margin-inline-start: 20px; margin-left: 19px">
                                    You scored <span style="background-color: white;"> ${philanthropy_pillar_score}</span> from a possible <span style="background-color: white;"> 18</span>
                                    <br>
                                    <span style="color: #00A199"><b>This indicates you are ${philanthropy_text} involved in environmental CSR</b></span
                                </p>
                            </div>
                        </div>
                    </section>
                    <section style="margin-top: 30px; background-color: white; padding: 10px;">
                        <div class="container">
                            <h1 style="color: #00a199;">
                                <strong>Become CSR Accredited click <a style="color: #00A19A;" href="https://csr-accreditation.co.uk/apply-for-csr-accreditation/">here</a> to Register for FREE</strong>
                            </h1>
                            <p>
                                CSR Accreditation provides independent recognition of an organisation's
                                socially responsible activities. We encourage you to build on these results
                                and register for CSR Accreditation. Registration is FREE and we will supply 
                                you with guidance, tools and the confidence to develop an effective CSR policy
                                to build into your organisation strategy.
                            </p>
                        </div>
                    </section>
                    <section style="margin-top: 30px;">
                        <div class="container" style="background-color: #00a199 !important; height: 70px;"></div>
                    </section>
                </div>
            </div>
        </div>
        
    </body>
    </html>
            `
        }).then(()=>{
            Swal.fire({
                title: "Your result has been successfully sent",
                confirmButtonText: 'Okay',
              }).then((result) => {
                window.location.href = "https://csr-accreditation.co.uk/apply-for-csr-accreditation/";
              })
        }).catch(() => swal.fire('Your email was not sent.'))
    }

}
