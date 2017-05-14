// @flow
import React from "react";

type Props = {
  animate: boolean
};

export default class AnimatedDots extends React.Component<void, Props, Object> {
  state: {
    dotcount: number,
    interval: number,
    printed: string,
    animation: string,
    notification: boolean,
    ntype: string,
    nmessage: string
  };

  constructor(props: Props) {
    super(props);
    this.state = {
      dotcount: 1,
      interval: 0,
      printed: "",
      animation: "stopped",
      notification: false,
      ntype: 'info',
      nmessage: ''
    };
  }

  componentWillReceiveProps(props: Props) {
    if (props.animate === false) {
      clearInterval(this.state.interval);
      this.setState({ animation: "stopped" });
    } else {
      clearInterval(this.state.interval);
      this.animateDots.call(this);
    }
  }

  updateDots() {
    let printed = "", newcount;
    for (let i = 0; i < this.state.dotcount; i++) {
      printed = printed + ".";
    }
    if (this.state.dotcount > 6) {
      newcount = 1;
    } else {
      newcount = this.state.dotcount + 1;
    }
    this.setState({
      animation: "running",
      printed: printed,
      dotcount: newcount
    });
  }

  animateDots() {
    let { animate } = this.props;
    if (animate) {
      this.setState(s => {
        return {
          interval: setInterval(
            () => {
              this.updateDots.call(this);
            },
            200
          )
        };
      });
    }
  }

  componentDidMount() {
    this.animateDots.call(this);
  }
  
  render() {
    let classes = ["animated-dots", this.state.animation];
    return (
      <span className={classes.join(" ")}>
        {this.state.printed}

        <style jsx>
          {
            `
        .animated-dots {
          padding-left: 10px;
          font-size: 2em;
          font-weight: 700;
          color: #4285f4;
          opacity: 0
        }
        .running {
          opacity: 1
        }
        .stopped {
          opacity: 0
        }
      `
          }
        </style>
      </span>
    );
  }
}
