The TODO app with an immutable model and implemented 
`shouldComponentUpdate` (equals the usage of `PureComponent`).

    <ReactImmutableTodo useMutableModel={false}/>
    
    
..with a mutable model and the same performance checks
    
        <ReactImmutableTodo useMutableModel={true} forceUpdate={false}/>

..and a mutable model with disabled `shouldComponentUpdate`

        <ReactImmutableTodo useMutableModel={true} forceUpdate={true}/>
