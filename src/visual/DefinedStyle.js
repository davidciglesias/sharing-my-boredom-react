const drawerWidth = 340;

const DefinedStyle = theme => {
    return ({
        root: {
        display: 'flex',
        },
        appBar: {
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        },
        navBarSelectedBackground: {
            backgroundColor: "#cdd5d8"
        },
        highlightedText: {
            backgroundColor: "#e4caff"
        },
        noTextTransform: {
            textTransform: "none"
        },
        homeButton: {
            color: "white",  
        },
        verticalAlign: {
            "display": "inline-flex", 
            "vertical-align": "middle"
        },
        appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        },
        progress: {
        marginLeft: 20
        },
        menuButton: {
        marginLeft: 12,
        marginRight: 20,
        },
        hide: {
        display: 'none',
        },
        drawer: {
        width: drawerWidth,
        flexShrink: 0,
        },
        drawerPaper: {
        width: drawerWidth,
        },
        drawerHeader: {
            display: 'flex',
            alignItems: 'center',
            padding: '0 8px',
            ...theme.mixins.toolbar,
            justifyContent: 'flex-end',
        },
        formControl: {
            width: "100%",
        },
        content: {
        flexGrow: 1,
        padding: theme.spacing.unit * 3,
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: -drawerWidth,
        },
        contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
        }})
    };

  export default DefinedStyle