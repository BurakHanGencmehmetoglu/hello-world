import React, {Component} from 'react';
import { Chart }  from "primereact/chart";
import axios from "axios";
import {Messages} from "primereact/messages";



class ChartByNumberOfApplicant extends Component {

        state = {
            basicData : {
                labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
                datasets: [
                    {
                        label: 'Başvuru Sayılarına Göre Etkinlikler',
                        backgroundColor: '#42A5F5',
                        data: [65, 59, 80, 81, 56, 55, 1032]
                    }
                ]
            },
            basicOptions : {
                responsive : true,
                legend: {
                    labels: {
                        fontColor: '#658076'
                    }
                },
                scales: {
                    xAxes: [{
                        ticks: {
                            fontColor: '#495057'
                        }
                    }],
                    yAxes: [{
                        ticks: {
                            fontColor: '#495057',
                            min : 0,
                            max : 10
                        }
                    }]
                }
            },
            isVisible : false
        }

        componentDidMount() {
            var config = {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("AuthenticationToken")
                }
            }
            axios.get("/listActivityToCharts",config).then((result) => {
                if (result.data.success === "Başarısız.")
                {
                    this.messages.show({severity: "error", summary: 'Hata', detail: result.data.message});
                    this.setState({isVisible : false})
                }
                else {
                    let labelsarray = [];
                    let dataarray = [];
                    for (let i = 0; i < result.data.length; i++) {
                        labelsarray.push(result.data[i].activityName);
                        dataarray.push(result.data[i].numberOfApplicants);
                    }
                    let mybasicData = {
                        labels: labelsarray,
                        datasets: [
                            {
                                label: 'Başvuru Sayılarına Göre Etkinlikler',
                                backgroundColor: '#42A5F5',
                                data: dataarray
                            }
                        ]
                    }
                    let mybasicOptions = {
                        responsive : true,
                            legend: {
                            labels: {
                                fontColor: '#658076'
                            }
                        },
                        scales: {
                            xAxes: [{
                                ticks: {
                                    fontColor: '#495057'
                                }
                            }],
                                yAxes: [{
                                ticks: {
                                    fontColor: '#495057',
                                    min : 0,
                                    max : Math.max(...dataarray)*2
                                }
                            }]
                        }
                    }
                    this.setState({basicData : mybasicData,basicOptions : mybasicOptions,isVisible : true});
                }
            })
        }

        render() {
            return (
            <div>
                <Messages ref={(el) => this.messages = el}/>
                {this.state.isVisible ? <div className="card">
                                            <Chart type="bar" id="Bar Chart" data={this.state.basicData} options={this.state.basicOptions} />
                                        </div>
                    : null }
            </div>
            )
        }
}



export default ChartByNumberOfApplicant;























































