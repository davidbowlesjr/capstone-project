process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { exec } = require('child_process');
const fs = require('fs');
const AWS = require('aws-sdk');
const ec2 = new AWS.EC2({ region: 'us-east-1' });
const pricing = new AWS.Pricing({region: 'us-east-1'})

const app = express();
app.use(bodyParser.json());
app.use(cors());

///////////////////////////////////////////////////////////////////////////////////////
//                                      EC2 On Demand
///////////////////////////////////////////////////////////////////////////////////////
app.post('/getPricing', (req, res) => {
    const { instanceType, location, operatingSystem } = req.body;
//    const command = `aws pricing get-products --service-code "AmazonEC2" --filters "Type=TERM_MATCH,Field=instanceType,Value=${instanceType}" "Type=TERM_MATCH,Field=location,Value=${location}" "Type=TERM_MATCH,Field=operatingSystem,Value=${operatingSystem}" --max-items 10 --region us-east-1 > pricing.json`;

    console.log(instanceType, location, operatingSystem)
    const command = `aws pricing get-products --service-code "AmazonEC2" --filters "Type=TERM_MATCH,Field=instanceType,Value=${instanceType}" "Type=TERM_MATCH,Field=location,Value=${location}" "Type=TERM_MATCH,Field=operatingSystem,Value=${operatingSystem}" "Type=TERM_MATCH,Field=preInstalledSw,Value=NA" --max-items 10 --region us-east-1 > pricing.json`;    
exec(command, (error, stdout, stderr) => {
        if (error) {
            console.error(`Execution error: ${error}`);
            return res.status(500).send(error);
        }
        fs.readFile('pricing.json', 'utf8', (err, data) => {
            if (err) {
                console.error(`File read error: ${err}`);
                return res.status(500).send(err);
            }
            res.send(JSON.parse(data));
        });
    });
});
///////////////////////////////////////////////////////////////////////////////////////
//                                      EC2 Spot Instances
///////////////////////////////////////////////////////////////////////////////////////
app.post('/getSpotPricing', (req, res) => {
  const { instanceType, location, operatingSystem } = req.body;
  
  const locationMapping = {
      "US East (N. Virginia)": "us-east-1",
      "US East (Ohio)": "us-east-2",
      "US West (N. California)": "us-west-1",
      "US West (Oregon)": "us-west-2",
  };
  
  const awsRegion = locationMapping[location];
  if (!awsRegion) {
      return res.status(400).send('Invalid location');
  }

  const osMapping = {
    'Linux': 'Linux/UNIX',
    'Windows': 'Windows'
  };

  const productDescription = osMapping[operatingSystem];
  if (!productDescription) {
    return res.status(400).send('Invalid operating system');
  }
  
  const ec2 = new AWS.EC2({ region: awsRegion });
  
  const params = {
    InstanceTypes: [instanceType],
    ProductDescriptions: [productDescription],
    MaxResults: 1
  };

  
  ec2.describeSpotPriceHistory(params, (err, data) => {
      if (err) {
          console.error(`API call error: ${err}`);
          return res.status(500).send(err);
      }
      if (!data.SpotPriceHistory || data.SpotPriceHistory.length === 0) {
          return res.status(404).send('Spot price not found');
      }
      const spotPrice = data.SpotPriceHistory[0].SpotPrice;
      res.send({ spotPrice });
  });
});

///////////////////////////////////////////////////////////////////////////////////////
//                                      EC2 Reserved Instaces
///////////////////////////////////////////////////////////////////////////////////////
app.post('/getReservedPricing', async (req, res) => {
  const { instanceType, location, operatingSystem, leaseContractLength, purchaseOption } = req.body;
  
  const params = {
    Filters: [
      {
        Type: 'TERM_MATCH',
        Field: 'instanceType',
        Value: instanceType,
      },
      {
        Type: 'TERM_MATCH',
        Field: 'location',
        Value: location,
      },
      {
        Type: 'TERM_MATCH',
        Field: 'operatingSystem',
        Value: operatingSystem,
      },
      {
        Type: 'TERM_MATCH',
        Field: 'termType',
        Value: 'Reserved',
      },
      {
        Type: 'TERM_MATCH',
        Field: 'leaseContractLength',
        Value: leaseContractLength, // Use the value from the request body
      },
      {
        Type: 'TERM_MATCH',
        Field: 'purchaseOption',
        Value: purchaseOption, // Use the value from the request body
      },
    ],
    ServiceCode: 'AmazonEC2',
    MaxResults: 1,
  };

    
    try {
      const data = await pricing.getProducts(params).promise();
      console.log("DATA:", data)
      if (!data.PriceList || data.PriceList.length === 0) {
        return res.status(404).send('Reserved price not found');
      }
      const reservedPriceDetails = data.PriceList[0];
      res.send(reservedPriceDetails);
    } catch (error) {
      console.error(`API call error: ${error}`);
      return res.status(500).send(error.message);
    }
  });
  

///////////////////////////////////////////////////////////////////////////////////////
//                                      Run App
///////////////////////////////////////////////////////////////////////////////////////
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
