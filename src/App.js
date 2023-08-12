import styled from 'styled-components'
import {useState} from 'react'
import { Line } from 'react-chartjs-2';

import {
  Chart,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip
} from 'chart.js'

Chart.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip
)

function App() {
  const api = process.env.REACT_APP_API_KEY;
  console.log(api + "new")

  
  
  const [price, changeprice] = useState([]);
  const [dates, changedates] = useState([]);
  const [show, updateShow] = useState(false);

  //
  //profile
  const [name, setName] = useState('N/A');
  const [curprice, setPrice] = useState('N/A');
  const [ceo, setCeo] = useState('N/A')
  const [headquaters, setHeadquaters] = useState('N/A')
  const [industry, setIndustry] = useState('N/A');
  const [description, setDesc] = useState('N/A')
  const [exchange, setExchange] = useState('N/A')
  const [mktcap, setcap] = useState('N/A')
  //rating
  const [rating, setRating] = useState('N/A')
  const [recomendation, setRecom] = useState('N/A')
  //

  const graphinput = {
    labels: dates,
    datasets: [{
      labels: 'Stock Price',
      data: price,
      pointBorderColor: '#64ffda',
      tension: 0.3,
      borderColor: '#64ffda'
    }]
  }
  const option = {
    scales: {
      x: {
          grid: {
            color: 'black'
          },
          ticks: {
              color: 'white'  // Color for x-axis labels
          }
      },
      y: {
        grid: {
          color: 'black'
        },
          ticks: {
              color: 'white'  // Color for y-axis labels
          }
      }
  }
  }
  function formatMarketCap(value) {
    if (value < 1e3) return `$${value}`; // Less than 1,000
    if (value >= 1e3 && value < 1e6) return `$${(value / 1e3).toFixed(2)}K`; // Thousands
    if (value >= 1e6 && value < 1e9) return `$${(value / 1e6).toFixed(2)}M`; // Millions
    if (value >= 1e9 && value < 1e12) return `$${(value / 1e9).toFixed(2)}B`; // Billions
    if (value >= 1e12) return `$${(value / 1e12).toFixed(2)}T`; // Trillions
  }
  function truncateDescription(desc) {
    const words = desc.split(' ');
    if (words.length <= 120) return desc;
    return words.slice(0, 120).join(' ') + '...';
  }
  
  

  const [symbol, updatesymbol] = useState('AAPL');
  const takeSymbol = (event) => {
    updatesymbol(event.target.value)
  }

  const fetchData = async () => {
    try{
      console.log(`https://financialmodelingprep.com/api/v3/historical-price-full/${symbol}?apikey=${api}`)
      const response = await fetch(`https://financialmodelingprep.com/api/v3/historical-price-full/${symbol}?apikey=${api}`)
      
      const data = await response.json();
      return data.historical;
    }catch (error) {
      console.log("Error in Fectching: ", error)
    }
  } 

  const companyQuote = async () => {
    try{
      const response = await fetch(`https://financialmodelingprep.com/api/v4/company-outlook?symbol=${symbol}&apikey=${api}`)
      const data = await response.json()
      return data;
    }catch (error) {
      console.log("Error : ", error);
    }
  }
  const search = async () => {
    if(symbol === ''){
      return;
    }else{
      
      let data = await fetchData();
      const quote = await companyQuote();
    
      console.log(quote)
     
      console.log()
      if(data && data.length !== 0){
        data = data.reverse()
        changeprice(data.map(item => item.close))
        changedates(data.map(item => item.date))
        updateShow(true);
        try {
          setName(quote.profile.companyName)
          setPrice('$' + quote.profile.price)
          setCeo(quote.profile.ceo)
          setHeadquaters(quote.profile.city + ', ' + quote.profile.country)
          setIndustry(quote.profile.industry)
          setDesc(truncateDescription(quote.profile.description));
          setExchange(quote.profile.exchange)
          setcap(formatMarketCap(quote.profile.mktCap));
          setRating(quote.rating[0].rating)
          setRecom(quote.rating[0].ratingRecommendation)
        } catch {
          console.log("")
        }
      }else{

        return;
      }
      

    }
  }
  return (
    <Wrapper>
      <Header>Trading View</Header>
      <SearchBox>
        <InputBox type='text' placeholder='Enter the Symbol.....' onChange={takeSymbol}></InputBox>
        <SearchButton onClick={search}>Search</SearchButton>
      </SearchBox>
      <DisplayBox >
        <Graph col = {show}>
          <Line
            data = {graphinput}
            options={option}
          >
          </Line>
        </Graph>
        <Details col = {show}>
          <Name>{name}</Name>
          <Moreinfo>
            <Entity>
              <Identifier>Symbol : </Identifier>
              <Value>{symbol}</Value>
            </Entity>
            <Entity>
              <Identifier>Industry : </Identifier>
              <Value>{industry}</Value>
            </Entity>
            <Entity>
              <Identifier>Price : </Identifier>
              <Value>{curprice}</Value>
            </Entity>
            <Entity>
              <Identifier>Exchange : </Identifier>
              <Value>{exchange}</Value>
            </Entity>
            <Entity>
              <Identifier>CEO : </Identifier>
              <Value>{ceo}</Value>
            </Entity>
            <Entity>
              <Identifier>Headquarter :</Identifier>
              <Value>{headquaters}</Value>
            </Entity>
            <Entity>
              <Identifier>Market Cap : </Identifier>
              <Value> {mktcap}</Value>
            </Entity>
            <Entity>
              <Identifier>Rating : </Identifier>
              <Value>{rating}</Value>
            </Entity>
            <Entity>
              <Identifier>Recommendation : </Identifier>
              <Value>{recomendation}</Value>
            </Entity>
            <Desc>
              <DescHead>Company Information</DescHead>
              <DescBody>{description}</DescBody>
            </Desc>
              
          </Moreinfo>
        </Details>
      </DisplayBox>
      <Footer>
        Bulit & Designed By S. Dasgupta
      </Footer>
    </Wrapper>
  );
}
const Footer = styled.div `
  height: 3%;
  margin-top: 2%;
  width: 80%;
  font-family: 'Roboto Mono', monospace;
  display: flex;
  align-items: end;
  justify-content: center;
 
  padding-top: 0%;
  
`
const DisplayBox = styled.div`
  height: 65%;
  width: 99%;
  margin-left: 2%;
  margin-right: 1%;
  /* border: solid black 2px; */
  margin-top: 2%;
 
  gap: 2%;
  display: flex;
`
const Graph = styled.div`
  display: ${props => props.col ? 'flex' : 'none'};
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 65%;
  color: #64ffda;

`
const Details = styled.div`
  height: 100%;
  width: 35%;
  display: ${props => props.col ? 'flex':'none'};
  flex-direction: column;
  align-items: center;
  justify-content: baseline;
  padding-top: 1%;
  gap: 5%;
`
const Moreinfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-right: 8px;
`
const Entity = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  /* gap: 10px; */
  width: 100%;
`
const Identifier = styled.div`
  font-family: 'Roboto Mono', monospace;
  display: flex;
  align-items: center;
  justify-content: left;
  
  font-weight: 500;
  width: 42%;
  //width: 70%; // adjust this value as needed
  text-align: right; // align the text to the right
  padding-right: 10px; // add some padding for spacing
`
const Desc = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1%;
  margin-top: 3%;
`
const DescHead = styled.div`
  display: flex;
  text-align: center;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 17px;
  font-family: 'Roboto Mono', monospace;
`
const DescBody = styled.div`
  font-family: 'Roboto Mono', monospace;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-size: 13px;
`
const Value = styled.div`
  font-family: 'Roboto Mono', monospace;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: left;
  width: auto;
  padding-right: 3%;
  font-size: 13px;
`

const Header = styled.h1`
  padding: 10px;
  font-family: 'Roboto Mono', monospace;
`;
const SearchBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 80%;
  height: 7%;
  gap: 3%;
`
const InputBox = styled.input`
  display: flex;
  border: none;
  background-color: #040f21;
  border-radius: 15px;
  width: 60%;
  height: 70%;
  font-size: 120%;
  padding-left: 3%;
  caret-color: #64ffda;
  color: #64ffda;
  ::placeholder{
    font-family: 'Roboto Mono', monospace;
    font-weight: 200;
  }
  &:hover{
    background-color: #030c1c;
  }
  &:focus{
    outline: none;
    box-shadow: 0 0 5px #64ffda;
  }
`
const Name = styled.div`
  background-color: transparent;
  font-family: 'Roboto Mono', monospace;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 22px;
  font-weight: 600;
  text-align: center;
`
const SearchButton = styled.button`
  display: flex;
  border: solid #64ffda 1px;
  background-color: transparent;
  font-family: 'Roboto Mono', monospace;
  justify-content: center;
  align-items: center;
  font-size: 120%;
  border-radius: 10px;
  font-weight: 300;
  cursor: pointer;
  
  width: 9%;
  height: 65%;
  color: #64ffda;
  &:hover{
    background-color: rgba(100,255,218, 0.1);
  }
`
const Wrapper = styled.div`
  background-color: #0b1930;
  height: 100vh;
  display: flex;
  width: 100vw;
  
  align-items: center;
  flex-direction: column;
  color: #64ffda;
`;

export default App;
