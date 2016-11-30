import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import SortableTree, { toggleExpandedForAll } from '../../index';
import styles from './stylesheets/app.scss';
import NodeRenderer from './node-renderer.js';
import '../shared/favicon/apple-touch-icon.png';
import '../shared/favicon/favicon-16x16.png';
import '../shared/favicon/favicon-32x32.png';
import '../shared/favicon/favicon.ico';
import '../shared/favicon/safari-pinned-tab.svg';

const maxDepth = 5;

class App extends Component {
    constructor(props) {
        super(props);

        const renderDepthTitle = ({ path }) => `Depth: ${path.length}`;

        this.state = {
            searchString: '',
            searchFocusIndex: 0,
            searchFoundCount: null,
            treeData: [
                {
                  expanded: true,
                  title: ( 
                    <span style={{fontSize: 14}}>
                      Артём Самофалов, руководитель отдела, +7 965 420-57-12  <a href="">anton@artuganov.ru</a>
                    </span>
                  ),
                },
                {
                  expanded: true,
                  title: ( 
                    <span style={{fontSize: 14}}>
                      Вадим Юмадилов, менеджер, +7 965 420-57-12  anton@artuganov.ru
                    </span>
                  ),
                },
                {
                  expanded: true,
                  title: ( 
                    <span style={{fontSize: 14}}>
                      Константин Сухарев, менеджер, +7 965 420-57-12  anton@artuganov.ru
                    </span>
                  ),
                },
                {
                  expanded: true,
                  title: ( 
                    <span style={{fontSize: 14}}>
                      Константин Сухарев, менеджер, +7 965 420-57-12  anton@artuganov.ru
                    </span>
                  ),
                },
                {
                  expanded: true,
                  title: ( 
                    <span style={{fontSize: 14}}>
                      Константин Сухарев, менеджер, +7 965 420-57-12  anton@artuganov.ru
                    </span>
                  ),
                },
            ],
        };

        this.updateTreeData = this.updateTreeData.bind(this);
        this.expandAll = this.expandAll.bind(this);
        this.collapseAll = this.collapseAll.bind(this);
    }

    updateTreeData(treeData) {
        this.setState({ treeData });
    }

    expand(expanded) {
        this.setState({
            treeData: toggleExpandedForAll({
                treeData: this.state.treeData,
                expanded,
            }),
        });
    }

    expandAll() {
        this.expand(true);
    }

    collapseAll() {
        this.expand(false);
    }

    render() {
        const projectName = 'React Sortable Tree';
        const authorName = 'Chris Fritz';
        const authorUrl = 'https://github.com/fritz-c';
        const githubUrl = 'https://github.com/fritz-c/react-sortable-tree';

        const {
            treeData,
            searchString,
            searchFocusIndex,
            searchFoundCount,
        } = this.state;

        const alertNodeInfo = ({
            node,
            path,
            treeIndex,
            lowerSiblingCounts: _lowerSiblingCounts,
        }) => {
            const objectString = Object.keys(node)
                .map(k => (k === 'children' ? 'children: Array' : `${k}: '${node[k]}'`))
                .join(`,\n   `);

            alert( // eslint-disable-line no-alert
                `Info passed to the button generator:\n\n` +
                `node: {\n   ${objectString}\n},\n` +
                `path: [${path.join(', ')}],\n` +
                `treeIndex: ${treeIndex}`
            );
        };

        const selectPrevMatch = () => this.setState({
            searchFocusIndex: searchFocusIndex !== null ?
                ((searchFoundCount + searchFocusIndex - 1) % searchFoundCount) :
                searchFoundCount - 1,
        });

        const selectNextMatch = () => this.setState({
            searchFocusIndex: searchFocusIndex !== null ?
                ((searchFocusIndex + 1) % searchFoundCount) :
                0,
        });

        return (
            <div>
                <section className={styles['page-header']}>
                    <h1 className={styles['project-name']}>{projectName}</h1>

                    <h2 className={styles['project-tagline']}>
                        Drag-and-drop sortable representation of hierarchical data
                    </h2>
                </section>

                <section className={styles['main-content']}>
                    <h3>Demo</h3>

                    <button onClick={this.expandAll}>
                        Expand All
                    </button>

                    <button onClick={this.collapseAll}>
                        Collapse All
                    </button>

                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <form
                        style={{ display: 'inline-block' }}
                        onSubmit={(event) => {
                            event.preventDefault();
                        }}
                    >
                        <label htmlFor="find-box">
                            Search:&nbsp;

                            <input
                                id="find-box"
                                type="text"
                                value={searchString}
                                onChange={event => this.setState({ searchString: event.target.value })}
                            />
                        </label>

                        <button
                            type="button"
                            disabled={!searchFoundCount}
                            onClick={selectPrevMatch}
                        >
                            &lt;
                        </button>

                        <button
                            type="submit"
                            disabled={!searchFoundCount}
                            onClick={selectNextMatch}
                        >
                            &gt;
                        </button>

                        <span>
                            &nbsp;
                            {searchFoundCount > 0 ? (searchFocusIndex + 1) : 0}
                            &nbsp;/&nbsp;
                            {searchFoundCount || 0}
                        </span>
                    </form>

                    <div style={{ height: 850 }}>
                        <SortableTree
                            rowHeight={36}
                            treeData={treeData}
                            onChange={this.updateTreeData}
                            maxDepth={maxDepth}
                            searchQuery={searchString}
                            searchFocusOffset={searchFocusIndex}
                            nodeContentRenderer={NodeRenderer}
                            scaffoldBlockPxWidth={16}
                            searchFinishCallback={matches =>
                                this.setState({
                                    searchFoundCount: matches.length,
                                    searchFocusIndex: matches.length > 0 ? searchFocusIndex % matches.length : 0,
                                })
                            }
                        />
                    </div>

                    <a href={githubUrl}>Documentation on Github</a>

                    <footer className={styles['site-footer']}>
                        <span className={styles['site-footer-owner']}>
                            <a href={githubUrl}>{projectName}</a> is maintained by <a href={authorUrl}>{authorName}</a>.
                        </span>

                        <span className={styles['site-footer-credits']}>
                            This page was generated by <a href="https://pages.github.com">GitHub Pages</a> using the <a href="https://github.com/jasonlong/cayman-theme">Cayman theme</a> by <a href="https://twitter.com/jasonlong">Jason Long</a>.
                        </span>
                    </footer>
                </section>

                <a href={githubUrl}>
                    <img
                        style={{ position: 'absolute', top: 0, right: 0, border: 0 }}
                        src="https://camo.githubusercontent.com/38ef81f8aca64bb9a64448d0d70f1308ef5341ab/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f6769746875622f726962626f6e732f666f726b6d655f72696768745f6461726b626c75655f3132313632312e706e67"
                        alt="Fork me on GitHub"
                        data-canonical-src="https://s3.amazonaws.com/github/ribbons/forkme_right_darkblue_121621.png"
                    />
                </a>
            </div>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('app'));
