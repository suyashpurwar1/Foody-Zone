import { useEffect, useState } from "react";
import styled from "styled-components";
import SearchResult from "./components/SearchResult";
export const BASE_URL = "http://localhost:9000";

const App = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filterData, setFilterData] = useState(null);
  const [selectedBtn, setSelectedBtn] = useState("all");

  useEffect(() => {
    const fectchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(BASE_URL);

        const json = await response.json();

        setData(json);
        setFilterData(json);
        // console.log(json);
        setLoading(false);
      } catch (error) {
        setError("Unable to fetch Data");
      }
    };
    fectchData();
  }, []);

  const searchFood = (e) => {
    const searchValue = e.target.value;
    console.log(searchValue);
    if (searchValue === "") {
      setFilterData(null);
    }
    const filter = data?.filter((food) =>
      food.name.toLowerCase().includes(searchValue.toLowerCase())
    );
    setFilterData(filter);
  };

  const filterFood = (type) => {
    if (type === "all") {
      setFilterData(data);
      setSelectedBtn("all");
    } else {
      const filter = data?.filter((food) =>
        food.type.toLowerCase().includes(type.toLowerCase())
      );
      setFilterData(filter);
      setSelectedBtn(type);
    }
  };

  const filterBtns = [
    {
      name: "All",
      type: "all",
    },
    {
      name: "Breakfast",
      type: "breakfast",
    },
    {
      name: "Lunch",
      type: "lunch",
    },
    {
      name: "Dinner",
      type: "dinner",
    },
  ];

  if (error) return <div>{error}</div>;
  if (loading) return <div>Loading.....</div>;

  return (
    <Container>
      <TopContainer>
        <div className="logo">
          <img src="/images/Foody Zone.svg" alt="logo-image" />
        </div>
        <div className="search">
          <input onChange={searchFood} type="text" placeholder="Search Food" />
        </div>
      </TopContainer>

      <FilterContainer>
        {filterBtns.map((value) => (
          <FilterButton isSelected={selectedBtn===value.type} key={value.name} onClick={() => filterFood(value.type)}>
            {value.name}
          </FilterButton>
        ))}
      </FilterContainer>

      <SearchResult data={filterData} />
    </Container>
  );
};
export default App;

export const Container = styled.div`
  width: 100%;
  margin: 0 auto;
`;

const TopContainer = styled.section`
  margin: 0 8%;
  height: 140px;
  display: flex;
  justify-content: space-between;
  padding: 16px;
  align-items: center;
  .search input {
    background-color: transparent;
    border: 1px solid red;
    color: white;
    border-radius: 5px;
    height: 40px;
    font-size: 16px;
    padding: 0 10px;
    &::placeholder {
      color: white;
    }
  }
  @media (0px <width<650px) {
    flex-direction: column;
    height: 110px;
  }
`;
const FilterContainer = styled.section`
  display: flex;
  justify-content: center;
  gap: 15px;
  margin-bottom: 20px;
`;
export const FilterButton = styled.button`
  border-radius: 5px;
  background:${({isSelected})=>(isSelected ? "#ff9500" :"#ff4343")} ;
  padding: 8px 12px;
  border: none;
  color: #ffffff;
  cursor: pointer;
  &:hover {
    background-color: #ff9500;
  }
`;
