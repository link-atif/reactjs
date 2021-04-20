import React from "react";

const InnerTable = ({
	innerTableData,
}) => {
	return (
		<table className="table table-hover table-striped inner-table cutom-inner-tb">
			{/* <tr>
					{innerTableData.columns.map((item, i) => (
						<th key={i}>{item.name}</th>
					))}
			</tr>
			 */}
			{innerTableData.data.map((element, i) => (
				<tr key={i}>
					<td>{element.totalAmount}</td>
					<td>{element.drugCharges}</td>
					<td>{element.drugClaimed}</td>
					<td>{element.ancillaryChares}</td>
				</tr>
			))}
		</table>
	)
}

export default InnerTable;