import { UNIT_DASHBOARD_RECEIVED, ORGANIZER_DASHBOARD_RECEIVED, BUSINESS_CHART_ARIVED, IT_CHART_ARIVED, HR_CHART_ARIVED, WHOLESALE_CHART_ARIVED, FINANCE_CHART_ARIVED } from "../constants";

let dashboard = {
    unitMonthly: {
        approved: 0,
        rejected: 0
    },
    unitTotal: {
        approved: 0,
        rejected: 0
    },
    organizerUnits: [],
    unitCharts: {
        business: {
            approved: [],
            rejected: []
        },
        hr: {
            approved: [],
            rejected: []
        },
        it: {
            approved: [],
            rejected: []
        },
        finance: {
            approved: [],
            rejected: []
        },
        wholesale: {
            approved: [],
            rejected: []
        }
    }
}
export default function (state = dashboard, action) {
    switch (action.type) {
        case UNIT_DASHBOARD_RECEIVED:
            return {...state, unitMonthly: action.payload.monthly, unitTotal: action.payload.totals}
        case ORGANIZER_DASHBOARD_RECEIVED:
            return {...state, organizerUnits: action.payload.unitsCount}
        case BUSINESS_CHART_ARIVED:
            return {...state, unitCharts: 
                {...state.unitCharts, business: action.payload.data }
            }
        case IT_CHART_ARIVED:
            return {...state, unitCharts: 
                {...state.unitCharts, it: action.payload.data }
            }
        case HR_CHART_ARIVED:
            return {...state, unitCharts: 
                {...state.unitCharts, hr: action.payload.data }
            }
        case WHOLESALE_CHART_ARIVED:
            return {...state, unitCharts: 
                {...state.unitCharts, wholesale: action.payload.data }
            }
        case FINANCE_CHART_ARIVED:
            return {...state, unitCharts: 
                {...state.unitCharts, finance: action.payload.data }
            }
        default:
            break;
    }
    return state;
}