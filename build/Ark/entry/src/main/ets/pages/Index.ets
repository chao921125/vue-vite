@Entry
@Component
struct Index {
  @State message: string = 'Hello World'

  build() {
    Row() {
      Column() {
        Text(this.message)
          .fontSize(50)
          .fontWeight(FontWeight.Bold)
        Button() {
          Text("Click").fontSize(30).fontWeight(FontWeight.Bold)
        }.type(ButtonType.Capsule).margin({
          top: 20
        }).backgroundColor("#00ff12").width("30%").height("5%")
      }
      .width('100%')
    }
    .height('100%')
  }
}