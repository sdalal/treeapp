import React, { Component } from 'react'
import './AdminStyle.css';

export class Add_Category extends React.Component {
	static displayName = Add_Category.name;

	constructor(props) {
		super(props);
		this.state = {
			BusinessType_ID: "",
			BusinessTypeName: "",
			CategoryName: "",
			CategoryNameError: "",
			Message: "",
			node_id: "",
		}

		this.handleSubmit = this.handleSubmit.bind(this);
	}

	componentDidMount() {
//		this.getBusinessTypeName();
	}

	async getBusinessTypeName() {
		const BusinessType_ID = this.props.node_id;
		const url = "/api/businesstype/getbusinesstypename/" + BusinessType_ID;
		await fetch(url)

			.then(response => response.json())
			.then((data) => {

				this.setState({ BusinessTypeName: data, loading: false })
				console.log(this.state.BusinessTypeName)
			})
	}


	handleSubmit(event) {
		event.preventDefault();
		if (this.validate()) {
			const BusinessType_ID = 1;
			const url = "/api/prodcategory/addcategory/" + BusinessType_ID;
			const data = { CategoryName: this.state.CategoryName }
			fetch(url, {
				method: 'POST',
				body: JSON.stringify(data),
				headers: { 'Content-Type': 'application/json' }
			})
				.then(res => res.json())
				.catch(error => console.error('Error:', error))
				.then(response => console.log('Success', response));
			alert('New category is succefully added.');

		};

	}


	validate() {
		let CategoryNameError = "";
		if (!this.state.CategoryName) {
			CategoryNameError = "Please enter a Category Name.";
		}

		if (CategoryNameError) {
			this.setState({ CategoryNameError });
			return false;
		}
		return true;
	}

	render() {
		return (
			<div>
				{this.props.node_id}
				
				<form>
					<b>Add Category</b>
					<table width="100%" border="0" cellSpacing="1" cellPadding="1" >
						<tbody>
							<tr>
								<td width="100%" className="largeGreyText">
									<label htmlFor="lblBusinessTypeName"></label>
								</td>
							</tr>
							<tr><td>&nbsp;</td></tr>
							<tr>
								<td>
									<table cellPadding="3" cellSpacing="0" width="100%" className="tableAddProd_Category">
										<tbody>
											<tr bgcolor="#dddddd" width="100%">
												<td colSpan="3">
													<table border="0" cellPadding="3" cellSpacing="0" width="100%">
														<tbody>
															<tr><td width="33%" align="right"><br /></td><td width="67%" align="left"></td></tr>
															<tr><td width="33%" align="right">
																<label htmlFor="lblCategoryName">Category Name:</label>&nbsp;</td>
																<td width="67%" align="left">
																	<input placeholder="Category Name" type="text" size="20" maxLength="50" />

																	<span className="LabelErrorMessage"></span>


																</td>
															</tr>
															<tr><td width="33%" align="right"><br /></td><td width="67%" align="left"></td></tr>

															<tr>
																<td width="33%" align="right"></td><td width="67%" align="left">
																	<button type="Submit">Submit</button>


																</td>
															</tr>
														</tbody>
													</table>
												</td>
											</tr>
										</tbody>
									</table>
								</td>
							</tr>
						</tbody>
					</table>


					<p></p>
				</form>
			</div>

		);
	}
}

export default Add_Category;