import React, { Component } from "react";

export class FetchData extends Component {
  constructor(props) {
    super(props);
    this.state = { currencies: [], loading: true };
  }

  componentDidMount() {
    this.populateWeatherData();
  }

  static renderForecastsTable(currencies) {
    return (
      <table className="table table-striped" aria-labelledby="tabelLabel">
        <thead>
          <tr>
            <th>Наименование</th>
            <th>Числовой код</th>
            <th>Курс</th>
            <th>Наминал</th>
            <th>Буквенный код</th>
            <th>Данные</th>
          </tr>
        </thead>

        <tbody>
          {currencies.map((currency) => (
            <tr key={currency.ID}>
              <td>{currency.name}</td>
              <td>{currency.numCode}</td>
              <td>{currency.rate}</td>
              <td>{currency.nominal}</td>
              <td>{currency.charCode}</td>
              <td>{currency.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }

  render() {
    let contents = this.state.loading ? (
      <p>
        <em>Loading...</em>
      </p>
    ) : (
      FetchData.renderForecastsTable(this.state.currencies)
    );

    return (
      <div>
        <h1 id="tabelLabel" className="text-center">
          Курс иностанной валюты
        </h1>
        <p className="text-center">Курс валют из сбербанка</p>
        {contents}
      </div>
    );
  }
  async populateWeatherData() {
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoibWlzaGluX3JvbWFuNCIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2VtYWlsYWRkcmVzcyI6Im1pc2hpbl9yb21hbjRAbWFpbC5jb20iLCJleHAiOjE2OTg4NDgxMDcsImlzcyI6Imh0dHA6Ly9sb2NhbGhvc3Q6NTA5OCIsImF1ZCI6Imh0dHBzOi8vbG9jYWxob3N0OjQ0NDI0In0.FZ2osJCF26g5H8MyqvDOGjSbzIYRellCvLpDYiqxnxs";
    //  await authService.getAccessToken();
    const response = await fetch("http://localhost:5098/api/currency", {
      headers: !token ? {} : { Authorization: `Bearer ${token}` },
      credentials: "include",
    });
    const data = await response.json().catch((error) => console.log(error));
    this.setState({ currencies: data, loading: false });
  }
}
