describe('영화 검색(겨울 왕국)2',() => {
    it('검색 페이지로 접근합니다', () => {
        cy.visit('/')
        cy.get('header .nav-link.active')
        .contains('Search')
    })
    it('영화를 검색합니다', () => {
        cy.get('input.form-control')
            .type('frozen')
        cy.get('select.form-select:nth-child(2)')
            .select('30')
        cy.get('button.btn')
            .contains('Apply')
            .click()
        cy.wait(2000)
        cy.get('.movie')
            .should('have.length',30)
    })
    it('겨울왕국2 영화 아이템을 선택합니다', () => {
        cy.get('.movie .title')
            .contains('Frozen II')
            .click()
    })
    it('영화의 상세 정보를 확인합니다', () => {
        cy.url() //http://localhost:8080//movie/tt4520988
            .should('include','/movie/tt4520988')
        cy.wait(1000)
        cy.get('header .nav-link.active')
            .contains('Movie')
        cy.get('.title')
            .contains('Frozen II')
    })
})