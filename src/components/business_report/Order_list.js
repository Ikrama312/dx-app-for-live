import moment from "moment";
import React from "react";
import DataTable, { createTheme } from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import "react-data-table-component-extensions/dist/index.css";
import Services from "../../services";
const data = [];
export default class Order_list extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      table_data: [],
      page: 1,
      total: 0,
    };
  }
  async componentDidMount() {
    Services.admin.getorder().then((response) => {
      const json = response.data.data;
      this.setState({
        table_data: json,
        page: json.currentPage,
        total: json.total,
      });
    });
  }
  render() {
    const columns = [
      {
        name: "DX ID",
        selector: "id",
        sortable: true,
      },
      {
        name: "From Dealer",
        selector: "dealer.fullname",
      },
      {
        name: "Dated",
        selector: "pickupTime",
        sortable: true,
        sortable: true,
        cell: (row) => moment(row.pickupTime).format("MM-DD-YYYY"),
      },
      {
        name: "To Dealer",
        // selector: "destination_dealer.fullname",
        sortable: true,
        cell: (row) => row.destination_dealer && row.destination_dealer.fullname,
      },
      {
        name: "Status",
        selector: "status",
        sortable: true,
      },
    ];
    return (
      <section className="site-main-wrapper pt-66 pb-5">
        <div className="w-100 pl-mdnav-cus mx-0">
          <div class="chat-header col-12">
            <h3 class="text-cus-primary pt-4 px-4">Business Reports</h3>
          </div>
          <div class="main-wrap-order px-5">
            <DataTableExtensions columns={columns} data={this.state.table_data}>
              <DataTable
                noHeader
                defaultSortField="id"
                defaultSortAsc={false}
                pagination
                paginationTotalRows={this.state.total}
                currentPage={this.state.page}
                highlightOnHover
              />
            </DataTableExtensions>
          </div>
        </div>
      </section>
    );
  }
}
