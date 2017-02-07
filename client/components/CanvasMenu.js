  import React from 'react';
  
  function ToObject( val ) {
    if ( val == null ) {
      throw new TypeError( 'Object.assign cannot be called with null or undefined' );
    }
    return Object( val );
  }

  var objectAssign = Object.assign || function ( target, source ) {
        var from;
        var keys;
        var to = ToObject( target );

        for (var s = 1; s < arguments.length; s++) {
          from = arguments[ s ];
          keys = Object.keys( Object( from ) );

          for (var i = 0; i < keys.length; i++) {
            to[ keys[ i ] ] = from[ keys[ i ] ];
          }
        }

        return to;
      };
  class CanvasMenu extends React.Component {
    componentWillMount() {
      this.colorArray = [ 'red', 'yellow', 'green', 'blue' ];
      this.styles = {
        canvasMenu: {
          'position': 'fixed',
          'width': '6em',
          'background-color': 'rgba(236, 236, 225, 1)',
          'border': '1px solid rgba(140, 140, 140, 1)',
          'border-radius': '10px',
          'cursor': 'pointer',
          'box-shadow': '3px 3px 3px rgba(20%, 20%, 40%, 0.2)',
          '-webkit-user-select': 'none',
          '-moz-user-select': 'none',
          '-ms-user-select': 'none',
          'user-select': 'none'
        },
        select_icon: {
          display: 'inline-block',
          width: '20px',
          height: '20px',
          'border-radius': '20px',
          margin: '5px',
          'vertical-align': 'middle',
          'box-shadow': '3px 3px 3px rgba(20%, 20%, 40%, 0.9)'
        },
        canvasMenuItemHover: {
          color: 'white',
          'background-color': 'rgba(0, 0, 255, 0.4)',
          'border-radius': '10px'
        },
        canvasMenuItemActive: {
          color: 'white',
          'background-color': 'rgba(0, 0, 255, 0.6)',
          'border-radius': '10px',
        },
        red: {
          'background-color': 'red'
        },
        yellow: {
          'background-color': 'yellow'
        },
        green: {
          'background-color': 'green'
        },
        blue: {
          'background-color': 'blue'
        }
      };
      this.pseudoCSS = [];
      this.pseudoCSS.push( 'div.canvasMenu div:hover{', this.attrToString( this.styles.canvasMenuItemHover ), '}' );
      this.pseudoCSS.push( 'div.canvasMenu div:active{', this.attrToString( this.styles.canvasMenuItemActive ), '}' );
    }
    m() {
      var res = {};
      for (var i = arguments.length - 1; i >= 0; i--) {
        if ( arguments[ i ] ) {
          objectAssign( res, arguments[ i ] );
        }
      }
      return res;
    }
    attrToString() {
      var object = arguments[ 0 ],
          output = [];
      for (var prop in object) {
        if ( object.hasOwnProperty( prop ) ) {
          output.push( prop, ':', object[ prop ], ';' );
        }
      }
      return output.join( '' );
    }
    handleCanvasMenuClick( e ) {
      var color;
      if ( e.target.className === '' )
        color = e.target.parentNode.className;
      else
        color = e.target.className;
      this.props.setBrush( color );
      this.props.handleContentFocus();
      Actions.hideCanvasMenu();
    }
    render() {
      var styles = this.styles,
          canvasMenuItem = this.colorArray.map( function ( color ) {
            return (
            <div className={color}>
              <span className={color} style={this.m(styles.select_icon, styles[color])} /> {Lang["canvas_brushColor_" + color]}
            </div>
            );
          }.bind( this ) );
      return (
      <div className="canvasMenu" onClick={this.handleCanvasMenuClick} style={this.m(styles.canvasMenu, this.props.menuLocation)}>
        <style>
          {
            this.pseudoCSS.join('')
          }
        </style>
        {canvasMenuItem}
      </div>
      );
  }
}

export default CanvasMenu;
